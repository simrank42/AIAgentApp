import os
from .ai.mock import MockAIAdapter
from .ai.huggingface import HuggingFaceAdapter

def get_adapter():
    provider = os.getenv("AI_PROVIDER", "mock").lower()
    if provider == "huggingface":
        return HuggingFaceAdapter()
    return MockAIAdapter()

adapter = get_adapter()
