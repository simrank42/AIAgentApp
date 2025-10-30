from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from pydantic import BaseModel
from ...deps import get_db, get_current_user
from ...schemas.session import MessageOut
from ...models.session import ChatSession
from ...models.message import Message
from ...models.user import User

router = APIRouter(prefix="/sessions/{session_id}/messages", tags=["messages"])
messages_router = APIRouter(prefix="/messages", tags=["messages"])

class MessageEdit(BaseModel):
    content: str

@router.get("", response_model=list[MessageOut])
def list_messages(session_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    s = db.get(ChatSession, session_id)
    if not s or s.user_id != user.id:
        raise HTTPException(status_code=404, detail="Not found")
    msgs = (
        db.query(Message)
        .filter(Message.session_id == session_id)
        .order_by(Message.created_at.asc())
        .all()
    )
    return [
        MessageOut(id=m.id, role=m.role.value, content=m.content, tokens=m.tokens, created_at=m.created_at)
        for m in msgs
    ]

# Message action endpoints
@messages_router.delete("/{message_id}")
def delete_message(
    message_id: int, 
    user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    """Delete a message"""
    message = db.get(Message, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    # Verify ownership through session
    session = db.get(ChatSession, message.session_id)
    if not session or session.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    db.delete(message)
    db.commit()
    return {"message": "Message deleted successfully"}

@messages_router.post("/{message_id}/regenerate")
def regenerate_message(
    message_id: int, 
    user: User = Depends(get_current_user), 
    db: Session = Depends(get_db)
):
    """Regenerate an AI message"""
    message = db.get(Message, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    # Verify ownership through session
    session = db.get(ChatSession, message.session_id)
    if not session or session.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Only regenerate assistant messages
    if message.role.value != "assistant":
        raise HTTPException(status_code=400, detail="Can only regenerate assistant messages")
    
    # TODO: Implement actual regeneration logic
    # For now, just return success
    return {"message": "Message regeneration initiated"}

@messages_router.put("/{message_id}")
def edit_message(
    message_id: int,
    message_edit: MessageEdit,
    user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    """Edit a message"""
    message = db.get(Message, message_id)
    if not message:
        raise HTTPException(status_code=404, detail="Message not found")
    
    # Verify ownership through session
    session = db.get(ChatSession, message.session_id)
    if not session or session.user_id != user.id:
        raise HTTPException(status_code=403, detail="Not authorized")
    
    # Only allow editing user messages
    if message.role.value != "user":
        raise HTTPException(status_code=400, detail="Can only edit user messages")
    
    message.content = message_edit.content
    db.commit()
    db.refresh(message)
    
    return MessageOut(
        id=message.id, 
        role=message.role.value, 
        content=message.content, 
        tokens=message.tokens, 
        created_at=message.created_at
    )
