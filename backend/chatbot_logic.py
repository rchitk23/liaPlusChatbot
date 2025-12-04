import random

class ChatBotLogic:
    def __init__(self):
        self.emp = [
            "I'm really sorry to hear that — I understand. Tell me more.",
            "That sounds frustrating. Can you share a bit more detail?"
        ]
        self.helpful = [
            "Thanks — I can help. Could you give me the error message or steps?",
            "Understood. One moment while I look into possible fixes — any additional detail helps."
        ]
        self.neutral = [
            "Got it! Could you tell me what's next?",
            "Okay, noted. Do you want help resolving this?"
        ]
    def generate_response(self, user_text: str, sentiment_label: str):
        if sentiment_label == "Negative":
            return random.choice(self.emp)
        if sentiment_label == "Positive":
            return random.choice(self.neutral)
        return random.choice(self.helpful)
