import os, sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

import pytest
from app import app

@pytest.fixture
def client():
    app.testing = True
    with app.test_client() as c:
        yield c

def test_empty_message(client):
    rv = client.post("/chat", json={"message": ""})
    assert rv.status_code == 400

def test_chat_flow(client):
    client.post("/reset")
    rv = client.post("/chat", json={"message": "I am very happy today!"})
    assert rv.status_code == 200
    data = rv.get_json()
    assert "bot" in data and "user_sentiment" in data

    s = client.get("/summary").get_json()
    assert "summary" in s
    assert s["summary"]["overall_label"] in ("Positive", "Neutral", "Negative")
