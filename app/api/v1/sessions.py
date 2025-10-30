from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from ...deps import get_db, get_current_user
from ...schemas.session import SessionCreateIn, SessionOut
from ...models.session import ChatSession
from ...models.agent import Agent

router = APIRouter(prefix="/sessions", tags=["sessions"])

def to_out(s: ChatSession, db: Session = None) -> SessionOut:
    # Get agent_id from agent_key
    agent_id = 1  # Default fallback
    if db:
        agent = db.query(Agent).filter(Agent.key == s.agent_key).first()
        if agent:
            agent_id = agent.id
    
    return SessionOut(
        id=s.id, 
        name=s.name or s.title,  # Use name if available, fallback to title
        title=s.title,  # Keep for backward compatibility
        agent_id=agent_id,
        agent_key=s.agent_key,  # Keep for backward compatibility
        created_at=s.created_at, 
        updated_at=s.updated_at,
        message_count=len(s.messages) if s.messages else 0
    )

@router.get("", response_model=list[SessionOut])
def list_my_sessions(db: Session = Depends(get_db), user=Depends(get_current_user)):
    sessions = (
        db.query(ChatSession)
        .filter(ChatSession.user_id == user.id)
        .order_by(ChatSession.updated_at.desc())
        .all()
    )
    return [to_out(s, db) for s in sessions]

@router.post("", response_model=SessionOut, status_code=201)
def create_session(payload: SessionCreateIn, db: Session = Depends(get_db), user=Depends(get_current_user)):
    agent = db.query(Agent).filter(Agent.id == payload.agent_id).first()
    if not agent:
        raise HTTPException(status_code=400, detail="Unknown agent_id")
    
    s = ChatSession(
        user_id=user.id, 
        name=payload.name,
        title=payload.name,  # Set title same as name for backward compatibility
        agent_key=agent.key
    )
    db.add(s)
    db.commit()
    db.refresh(s)
    return to_out(s, db)

@router.get("/{session_id}", response_model=SessionOut)
def get_session(session_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    s = db.get(ChatSession, session_id)
    if not s or s.user_id != user.id:
        raise HTTPException(status_code=404, detail="Not found")
    return to_out(s, db)

@router.patch("/{session_id}", response_model=SessionOut)
def update_session(
    session_id: int,
    payload: dict,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):
    """Update session properties (e.g., name/title)"""
    s = db.get(ChatSession, session_id)
    if not s or s.user_id != user.id:
        raise HTTPException(status_code=404, detail="Not found")
    
    # Update allowed fields
    if "name" in payload:
        s.name = payload["name"]
        s.title = payload["name"]  # Keep title in sync for backward compatibility
    
    db.commit()
    db.refresh(s)
    return to_out(s, db)

@router.delete("/{session_id}", status_code=204)
def delete_session(session_id: int, db: Session = Depends(get_db), user=Depends(get_current_user)):
    s = db.get(ChatSession, session_id)
    if not s or s.user_id != user.id:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(s)
    db.commit()
    return {"ok": True}
