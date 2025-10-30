from pydantic import BaseModel

class AgentOut(BaseModel):
    id: int
    key: str  # Keep key for backward compatibility
    name: str
    description: str  # Short public description (NOT the full system prompt)
    temperature: float
    model_id: str

    model_config = {
        "protected_namespaces": ()
    }

# Map of agent keys to their short public descriptions
AGENT_PUBLIC_DESCRIPTIONS = {
    "general": "A helpful, friendly assistant for general questions and conversations.",
    "coder": "Expert coding assistant for writing, debugging, and explaining code.",
    "creative": "Creative writing assistant for stories, articles, and imaginative content.",
    "analyst": "Data analysis assistant for insights, statistics, and problem-solving.",
}
