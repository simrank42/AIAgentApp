import asyncio
import json
import httpx
from typing import AsyncGenerator, Sequence
from .base import BaseAIAdapter, AIMessage, AgentConfig
from ...core.config import settings

class OpenAIAdapter(BaseAIAdapter):
    async def stream(
        self, system_prompt: str, history: Sequence[AIMessage], agent: AgentConfig
    ) -> AsyncGenerator[str, None]:
        if not settings.OPENAI_API_KEY:
            yield "[OpenAI adapter not configured: set OPENAI_API_KEY]"  # graceful hint
            return

        messages = [{"role": "system", "content": system_prompt}] + list(history)

        headers = {
            "Authorization": f"Bearer {settings.OPENAI_API_KEY}",
            "Content-Type": "application/json",
        }
        payload = {
            "model": agent.get("model_id") or settings.OPENAI_MODEL,
            "messages": messages,
            "temperature": agent.get("temperature", 0.7),
            "stream": True,
        }

        async with httpx.AsyncClient(timeout=60.0, base_url=settings.OPENAI_API_BASE) as client:
            async with client.stream("POST", "/chat/completions", headers=headers, json=payload) as r:
                async for line in r.aiter_lines():
                    if not line:
                        continue
                    if line.startswith("data: "):
                        data = line[6:].strip()
                        if data == "[DONE]":
                            break
                        try:
                            obj = json.loads(data)
                            delta = obj["choices"][0]["delta"].get("content")
                            if delta:
                                yield delta
                        except Exception:
                            # be fault-tolerant in stream parsing
                            await asyncio.sleep(0)
                            continue
