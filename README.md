<img width="1188" height="741" alt="image" src="https://github.com/user-attachments/assets/fc976f04-7d79-40df-9f20-4755db523ef6" />


# LiaPlus Sentiment-Aware ChatBot (React + Flask)

A full-stack chatbot project implementing Tier 1 and Tier 2 requirements of the assignment, with additional enhancements.

# Overview
This project is a sentiment-aware chatbot built using React (frontend) and Flask (backend).
It analyzes each user message individually and also generates overall sentiment for the full conversation.
It includes a clean, modern UI, mood trend chart, markdown support, and full conversation history tracking.

## Highlights
- Full conversation history saved in backend.
- Conversation-level sentiment (Tier 1) computed at summary time.
- Statement-level sentiment per user message (Tier 2) shown beside each message.
- Trend detection (improving/worsening/stable).
- React frontend: purple & neon professional UI, markdown support, mood chart, export transcript, voice input support.
- Modular, production-minded Python backend (Flask) with pytest tests.

## Tech stack
- Frontend: React 18, Chart.js, marked(Markdown parser), Tailwind CSS(for styling), Axios.
- Backend: Python 3.10+, Flask, NLTK VADER Sentiment Analyzer.
- Testing: pytest

## API Endpoints
POST /chat – Process user message, return bot reply + sentiment.
GET /history – Full conversation history.
GET /summary – Final overall sentiment, average score, mood trend, dominant emotion.
POST /reset – Clears conversation state.

## How to run

### Frontend
1. cd frontend
2. npm install
3. npm start
Open http://localhost:3000

### Backend
1. cd backend
2. python -m venv venv
3. source venv/bin/activate (Windows: venv\Scripts\activate)
4. pip install -r requirements.txt
5. python app.py
API will be at: http://127.0.0.1:5000

### Tests
cd backend
pytest

📊 Sentiment Logic
Sentiment scoring uses VADER compound polarity score:
>= 0.05 → Positive
<= -0.05 → Negative
otherwise → Neutral

Additionally:
Emotion keyword detection tags messages (joy, anger, sadness, fear, surprise).
Trend is calculated by comparing first half vs second half of scores.


