import asyncio
from typing import AsyncGenerator, Sequence
from huggingface_hub import InferenceClient
from .base import BaseAIAdapter, AIMessage, AgentConfig
from ...core.config import settings


class HuggingFaceAdapter(BaseAIAdapter):
    """Adapter for Hugging Face Inference API using huggingface_hub library."""

    async def stream(self, system_prompt: str, history: Sequence[AIMessage], agent: AgentConfig) -> AsyncGenerator[str, None]:
        key = settings.HF_API_KEY
        model = settings.HF_MODEL

        if not key:
            env_hint = "Render Dashboard → Environment Variables" if settings.is_production else "environment variables"
            yield f"[HFAdapter error: Missing HF_API_KEY. Please set your HuggingFace API key in {env_hint}. "
            yield f"In production, set HF_TOKEN in Render Dashboard → Your Service → Environment Variables.]"
            return

        # Prepare messages for chat completion
        messages = []
        if system_prompt:
            messages.append({"role": "system", "content": system_prompt})
        messages.extend([{"role": msg["role"], "content": msg["content"]} for msg in history])

        try:
            # Create InferenceClient with explicit model
            client = InferenceClient(
                model=model,
                token=key,
            )

            # Make chat completion request with enhanced parameters
            completion = client.chat.completions.create(
                model=model,
                messages=messages,
                max_tokens=2000,  # Increased for longer responses
                temperature=agent.get("temperature", 0.7),
                top_p=0.95,  # Nucleus sampling for better quality
                stream=True  # Enable streaming
            )

            # Stream the response token by token
            for chunk in completion:
                if hasattr(chunk, 'choices') and chunk.choices:
                    delta = chunk.choices[0].delta
                    if hasattr(delta, 'content') and delta.content:
                        # Yield content directly for smooth streaming
                        yield delta.content

        except Exception as e:
            error_msg = str(e)
            if "401" in error_msg or "unauthorized" in error_msg.lower():
                env_hint = "Render Dashboard → Environment Variables" if settings.is_production else "environment variables"
                yield f"\n\n❌ **Error**: Invalid HuggingFace API key. "
                yield f"Please check your `HF_TOKEN` in {env_hint}. "
                if settings.is_production:
                    yield "In production, verify the value is set in Render Dashboard → Your Service → Environment Variables."
            elif "404" in error_msg or "not found" in error_msg.lower():
                yield f"\n\n❌ **Error**: Model `{model}` not found or not available on HuggingFace Inference API.\n\nTry one of these models:\n- `mistralai/Mistral-7B-Instruct-v0.3`\n- `HuggingFaceH4/zephyr-7b-beta`\n- `meta-llama/Llama-3.2-3B-Instruct`"
            elif "429" in error_msg or "rate limit" in error_msg.lower():
                yield "\n\n❌ **Error**: Rate limit exceeded. HuggingFace free tier has usage limits. Please try again in a few minutes."
            elif "503" in error_msg or "loading" in error_msg.lower():
                yield f"\n\n⏳ **Model Loading**: The model `{model}` is currently loading on HuggingFace servers. This is normal for the first request. Please try again in 30-60 seconds."
            else:
                yield f"\n\n❌ **Error**: {error_msg}\n\nPlease check:\n1. Your HF_API_KEY is valid\n2. The model name is correct\n3. You have internet connection"
