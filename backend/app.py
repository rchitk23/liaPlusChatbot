from flask import Flask, request, jsonify
from flask_cors import CORS
from sentiment_analyzer import analyze_text, conversation_summary
from conversation_store import ConversationStore
from chatbot_logic import ChatBotLogic

app = Flask(__name__)
CORS(app)

store = ConversationStore()
bot_logic = ChatBotLogic()

@app.route("/chat", methods=["POST"])
def chat():
    data = request.get_json(force=True)
    user_text = data.get("message", "").strip()
    if not user_text:
        return jsonify({"error": "empty message"}), 400

    user_sent = analyze_text(user_text)
    store.add_user(user_text, user_sent)

    bot_reply = bot_logic.generate_response(user_text, user_sent["label"])
    store.add_bot(bot_reply)

    return jsonify({
        "bot": bot_reply,
        "user_sentiment": user_sent,
        "history": store.get_history()
    })

@app.route("/summary", methods=["GET"])
def summary():
    user_texts = store.get_user_texts()
    summ = conversation_summary(user_texts)
    return jsonify({
        "summary": summ,
        "history": store.get_history()
    })

@app.route("/history", methods=["GET"])
def history():
    return jsonify({"history": store.get_history()})

@app.route("/reset", methods=["POST"])
def reset():
    store.clear()
    return jsonify({"status": "ok", "message": "conversation cleared"})

if __name__ == "__main__":
    app.run(port=5000, debug=True)
