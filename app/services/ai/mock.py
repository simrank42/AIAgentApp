import asyncio
from typing import AsyncGenerator, Sequence
from .base import BaseAIAdapter, AIMessage, AgentConfig

CANNED = "This is a mock streaming response. It arrives token by token, perfect for dev."

class MockAIAdapter(BaseAIAdapter):
    async def stream(
        self, system_prompt: str, history: Sequence[AIMessage], agent: AgentConfig
    ) -> AsyncGenerator[str, None]:
        # naive tokenization by spaces
        for token in CANNED.split(" "):
            await asyncio.sleep(0.03)
            yield token + " "
