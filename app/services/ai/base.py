from typing import AsyncGenerator, Sequence

class AIMessage(dict):
    # {"role": "user"|"assistant"|"system", "content": str}
    pass

class AgentConfig(dict):
    # {"key": str, "name": str, "description": str, "temperature": float, "model_id": str}
    pass

class BaseAIAdapter:
    async def stream(
        self,
        system_prompt: str,
        history: Sequence[AIMessage],
        agent: AgentConfig,
    ) -> AsyncGenerator[str, None]:
        raise NotImplementedError
