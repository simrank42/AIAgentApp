import time
import json
from fastapi import APIRouter, WebSocket, WebSocketDisconnect
from jose import JWTError
from sqlalchemy.orm import Session
from ...core.security import verify_token_with_db
from ...core.validation import validate_and_sanitize_input, detect_sql_injection, detect_xss
from ...core.logging import security_logger
from ...core.config import settings
from ...core.rate_limit import update_rate_limit
from ...core.constants import MAX_WEBSOCKET_MESSAGE_SIZE, MESSAGE_MAX_LENGTH
from ...db.session import SessionLocal
from ...models.session import ChatSession
from ...models.message import Message
from ...services.chat import adapter
from datetime import datetime
from typing import Dict, Any

router = APIRouter()

# Rate limiting for WebSocket connections
_connection_limits: Dict[str, Dict[str, Any]] = {}
MAX_CONNECTIONS_PER_USER = 5
MESSAGE_RATE_LIMIT = 10  # messages per minute
CONNECTION_TIMEOUT = 3600  # 1 hour


def check_rate_limit(user_id: int, ip_address: str) -> bool:
    """Check if user/IP is within rate limits"""
    current_time = time.time()
    user_key = f"user_{user_id}"
    ip_key = f"ip_{ip_address}"
    
    # Clean old entries
    for key in list(_connection_limits.keys()):
        if current_time - _connection_limits[key]["last_seen"] > CONNECTION_TIMEOUT:
            del _connection_limits[key]
    
    # Check user connection limit
    user_connections = sum(1 for k, v in _connection_limits.items() 
                          if k.startswith(user_key) and current_time - v["last_seen"] < CONNECTION_TIMEOUT)
    
    if user_connections >= MAX_CONNECTIONS_PER_USER:
        return False
    
    # Check message rate limit
    if user_key in _connection_limits:
        last_message_time = _connection_limits[user_key].get("last_message", 0)
        message_count = _connection_limits[user_key].get("message_count", 0)
        
        if current_time - last_message_time < 60:  # Within last minute
            if message_count >= MESSAGE_RATE_LIMIT:
                return False
        else:
            # Reset counter if more than a minute has passed
            _connection_limits[user_key]["message_count"] = 0
    
    return True


@router.websocket("/ws/chat/{session_id}")
async def chat_ws(websocket: WebSocket, session_id: int):
    """Enhanced WebSocket endpoint with security measures"""
    db: Session = SessionLocal()
    client_ip = websocket.client.host if websocket.client else "unknown"
    connection_start_time = time.time()
    
    try:
        # --- 1️⃣ Enhanced token validation ---
        token = websocket.query_params.get("token")
        if not token:
            security_logger.log_unauthorized_access(
                endpoint=f"/ws/chat/{session_id}",
                method="WEBSOCKET",
                ip_address=client_ip,
                reason="Missing token"
            )
            await websocket.close(code=403, reason="Missing authentication token")
            return

        # Handle 'Bearer ' prefix if frontend sends it
        if token.startswith("Bearer "):
            token = token.split(" ", 1)[1]

        # Verify user with enhanced error handling
        try:
            print(f"[WS AUTH DEBUG] Verifying token for session {session_id}")
            print(f"[WS AUTH DEBUG] Token (first 50 chars): {token[:50]}...")
            user = verify_token_with_db(token, db)
            print(f"[WS AUTH DEBUG] Token verified successfully for user {user.id}")
        except JWTError as e:
            # Log the specific JWT error
            print(f"[WS AUTH ERROR] JWT Error: {str(e)}")
            print(f"[WS AUTH ERROR] Token: {token[:100]}...")
            security_logger.log_unauthorized_access(
                endpoint=f"/ws/chat/{session_id}",
                method="WEBSOCKET",
                ip_address=client_ip,
                reason=f"Invalid token: {str(e)}"
            )
            await websocket.close(code=403, reason="Invalid authentication token")
            return
        except Exception as e:
            # Log the specific error
            print(f"[WS AUTH ERROR] General Exception: {str(e)}")
            print(f"[WS AUTH ERROR] Exception type: {type(e).__name__}")
            import traceback
            print(f"[WS AUTH ERROR] Traceback:\n{traceback.format_exc()}")
            security_logger.log_security_violation(
                "websocket_auth_error",
                {"error": str(e), "session_id": session_id},
                client_ip,
                None
            )
            await websocket.close(code=403, reason="Authentication failed")
            return

        # --- 2️⃣ Rate limiting check ---
        if not check_rate_limit(user.id, client_ip):
            security_logger.log_rate_limit_exceeded(
                endpoint=f"/ws/chat/{session_id}",
                ip_address=client_ip,
                limit=MAX_CONNECTIONS_PER_USER,
                window=CONNECTION_TIMEOUT
            )
            await websocket.close(code=429, reason="Rate limit exceeded")
            return

        # --- 3️⃣ Accept WebSocket connection ---
        await websocket.accept()
        
        # Log successful connection
        security_logger.log_data_access(
            user_id=user.id,
            resource_type="websocket",
            resource_id=str(session_id),
            action="connect",
            ip_address=client_ip
        )

        # --- 4️⃣ Validate session ownership ---
        session = db.query(ChatSession).filter_by(id=session_id, user_id=user.id).first()
        if not session:
            security_logger.log_unauthorized_access(
                endpoint=f"/ws/chat/{session_id}",
                method="WEBSOCKET",
                ip_address=client_ip,
                user_id=user.id,
                reason="Session not found or access denied"
            )
            await websocket.close(code=403, reason="Session not found or access denied")
            return

        # --- 5️⃣ Fetch chat history with security logging ---
        history = [
            {"role": m.role.value, "content": m.content}
            for m in db.query(Message)
            .filter_by(session_id=session_id)
            .order_by(Message.created_at.asc())
            .all()
        ]
        
        # Log data access
        security_logger.log_data_access(
            user_id=user.id,
            resource_type="session",
            resource_id=str(session_id),
            action="read_messages",
            ip_address=client_ip
        )
        
        # Build system prompt from agent description
        system_prompt = "You are a helpful AI assistant."
        if session and session.agent_key:
            from ...models.agent import Agent
            agent_obj = db.query(Agent).filter_by(key=session.agent_key).first()
            if agent_obj:
                system_prompt = agent_obj.description
        
        agent = (
            {"temperature": 0.7, "model_id": "hf"}
            if session is None
            else {"temperature": 0.7, "model_id": session.agent_key}
        )

        # --- 6️⃣ Enhanced message processing loop ---
        message_count = 0
        last_activity = time.time()
        
        while True:
            try:
                # Check connection timeout
                if time.time() - last_activity > CONNECTION_TIMEOUT:
                    security_logger.log_data_access(
                        user_id=user.id,
                        resource_type="websocket",
                        resource_id=str(session_id),
                        action="timeout_disconnect",
                        ip_address=client_ip
                    )
                    await websocket.close(code=1000, reason="Connection timeout")
                    break

                # Receive message with timeout
                data = await websocket.receive_json()
                last_activity = time.time()
                
                # Validate message size
                message_str = json.dumps(data)
                if len(message_str) > MAX_WEBSOCKET_MESSAGE_SIZE:
                    security_logger.log_security_violation(
                        "websocket_message_too_large",
                        {"size": len(message_str), "limit": MAX_WEBSOCKET_MESSAGE_SIZE},
                        client_ip,
                        user.id
                    )
                    await websocket.send_json({"error": "Message too large"})
                    continue

                content = data.get("content", "")
                
                # --- 7️⃣ Enhanced input validation ---
                if not content or not content.strip():
                    await websocket.send_json({"error": "Empty message"})
                    continue
                
                # Check message length
                if len(content) > MESSAGE_MAX_LENGTH:
                    security_logger.log_security_violation(
                        "websocket_message_too_long",
                        {"length": len(content), "limit": MESSAGE_MAX_LENGTH},
                        client_ip,
                        user.id
                    )
                    await websocket.send_json({"error": "Message too long"})
                    continue
                
                # Validate and sanitize input
                try:
                    sanitized_content = validate_and_sanitize_input(
                        content, 
                        field_name="message",
                        max_length=MESSAGE_MAX_LENGTH
                    )
                except Exception as e:
                    security_logger.log_security_violation(
                        "websocket_invalid_input",
                        {"error": str(e), "content_length": len(content)},
                        client_ip,
                        user.id
                    )
                    await websocket.send_json({"error": "Invalid input detected"})
                    continue

                # Update rate limiting
                update_rate_limit(client_ip, "websocket")
                message_count += 1

                # --- 8️⃣ Create and save user message ---
                user_msg = Message(
                    session_id=session_id,
                    role="user",
                    content=sanitized_content,
                    tokens=len(sanitized_content.split()),
                    created_at=datetime.utcnow(),
                )
                db.add(user_msg)
                db.commit()
                db.refresh(user_msg)
                
                # Log message creation
                security_logger.log_data_modification(
                    user_id=user.id,
                    resource_type="message",
                    resource_id=str(user_msg.id),
                    action="create",
                    ip_address=client_ip
                )

                await websocket.send_json({"role": "user", "content": sanitized_content})

                # --- 9️⃣ Stream AI response with error handling ---
                reply = ""
                try:
                    current_history = history + [{"role": "user", "content": sanitized_content}]
                    async for token in adapter.stream(system_prompt, current_history, agent):
                        reply += token
                        await websocket.send_json({"delta": token})
                        
                        # Check for connection timeout during streaming
                        if time.time() - last_activity > CONNECTION_TIMEOUT:
                            break
                except Exception as e:
                    security_logger.log_security_violation(
                        "websocket_streaming_error",
                        {"error": str(e), "session_id": session_id},
                        client_ip,
                        user.id
                    )
                    await websocket.send_json({"error": "Streaming failed"})
                    continue

                # --- 🔟 Save assistant response ---
                if reply:
                    msg = Message(
                        session_id=session_id,
                        role="assistant",
                        content=reply,
                        tokens=len(reply.split()),
                        created_at=datetime.utcnow(),
                    )
                    db.add(msg)
                    db.commit()
                    
                    # Log assistant message creation
                    security_logger.log_data_modification(
                        user_id=user.id,
                        resource_type="message",
                        resource_id=str(msg.id),
                        action="create",
                        ip_address=client_ip
                    )

                await websocket.send_json({"done": True})

            except WebSocketDisconnect:
                break
            except Exception as e:
                security_logger.log_security_violation(
                    "websocket_processing_error",
                    {"error": str(e), "session_id": session_id},
                    client_ip,
                    user.id
                )
                await websocket.send_json({"error": "Processing failed"})
                break

    except WebSocketDisconnect:
        security_logger.log_data_access(
            user_id=user.id if 'user' in locals() else None,
            resource_type="websocket",
            resource_id=str(session_id),
            action="disconnect",
            ip_address=client_ip
        )
    except Exception as e:
        security_logger.log_security_violation(
            "websocket_connection_error",
            {"error": str(e), "session_id": session_id},
            client_ip
        )
    finally:
        db.close()
        
        # Log connection duration
        if 'user' in locals():
            duration = time.time() - connection_start_time
            security_logger.log_data_access(
                user_id=user.id,
                resource_type="websocket",
                resource_id=str(session_id),
                action="disconnect",
                ip_address=client_ip
            )
