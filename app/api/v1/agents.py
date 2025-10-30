from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from ...deps import get_db, get_current_user
from ...schemas.agent import AgentOut, AGENT_PUBLIC_DESCRIPTIONS
from ...models.agent import Agent

router = APIRouter(prefix="/agents", tags=["agents"])

@router.get("", response_model=list[AgentOut])
def list_agents(db: Session = Depends(get_db), user=Depends(get_current_user)):
    """
    List all available agents with PUBLIC descriptions only.
    System prompts are kept private and never sent to the frontend.
    """
    agents = db.query(Agent).order_by(Agent.key.asc()).all()
    return [
        AgentOut(
            id=a.id,
            key=a.key,
            name=a.name,
            # Use short public description, NOT the full system prompt
            description=AGENT_PUBLIC_DESCRIPTIONS.get(a.key, a.name),
            temperature=a.temperature,
            model_id=a.model_id,
        )
        for a in agents
    ]
