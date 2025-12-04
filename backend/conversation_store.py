from datetime import datetime
from typing import List, Dict

class ConversationStore:
    def __init__(self):
        self._history: List[Dict] = []

    def add_user(self, text: str, sentiment: dict):
        self._history.append({
            "sender": "user",
            "text": text,
            "sentiment": sentiment,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        })

    def add_bot(self, text: str):
        self._history.append({
            "sender": "bot",
            "text": text,
            "timestamp": datetime.utcnow().isoformat() + "Z"
        })

    def get_history(self):
        return self._history.copy()

    def clear(self):
        self._history = []

    def get_user_texts(self):
        return [h["text"] for h in self._history if h["sender"] == "user"]
