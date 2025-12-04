# LiaPlus Sentiment-Aware ChatBot (React + Flask)

Professional candidate submission implementing Tier 1 and Tier 2 requirements.

## Highlights
- Full conversation history saved in backend.
- Conversation-level sentiment (Tier 1) computed at summary time.
- Statement-level sentiment per user message (Tier 2) shown beside each message.
- Trend detection (improving/worsening/stable).
- React frontend: purple & neon professional UI, markdown support, mood chart, export transcript, voice input support.
- Modular, production-minded Python backend (Flask) with pytest tests.

## Tech stack
- Frontend: React 18, Chart.js, marked, Tailwind (optional).
- Backend: Python 3.10+, Flask, NLTK (VADER).
- Testing: pytest

## How to run

### Frontend
npm install-->
npm start-->
Open http://localhost:3000

### Backend
```bash
cd backend
python -m venv venv
source venv/bin/activate      # Windows: venv\\Scripts\\activate
pip install -r requirements.txt
python app.py
API will be at: http://127.0.0.1:5000



