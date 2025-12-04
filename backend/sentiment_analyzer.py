from nltk.sentiment.vader import SentimentIntensityAnalyzer
import nltk
nltk.download("vader_lexicon", quiet=True)
VADER = SentimentIntensityAnalyzer()

EMOTION_KEYWORDS = {
    "joy": ["happy", "glad", "joy", "delighted", "pleased", "awesome", "great", "😊", "😁"],
    "anger": ["angry", "mad", "furious", "hate", "annoyed", "😡", "😤"],
    "sadness": ["sad", "unhappy", "depressed", "down", "😭", "😢"],
    "fear": ["scared", "afraid", "fear", "worried", "anxious"],
    "surprise": ["surprised", "wow", "unexpected", "shocked"],
    "neutral": []
}

def _tag_emotion(text: str) -> str:
    t = text.lower()
    counts = {k:0 for k in EMOTION_KEYWORDS}
    for emo, kwlist in EMOTION_KEYWORDS.items():
        for kw in kwlist:
            if kw in t:
                counts[emo] += 1
    top = max(counts.items(), key=lambda kv: kv[1])
    if top[1] == 0:
        return "neutral"
    return top[0]

def _label_from_compound(c: float) -> str:
    if c >= 0.05:
        return "Positive"
    elif c <= -0.05:
        return "Negative"
    else:
        return "Neutral"

def analyze_text(text: str) -> dict:
    raw = VADER.polarity_scores(text)
    compound = raw["compound"]
    label = _label_from_compound(compound)
    emotion = _tag_emotion(text)
    return {"label": label, "score": compound, "emotion": emotion, "scores_raw": raw}

def conversation_summary(user_texts: list) -> dict:
    per_scores = []
    per_emotions = []
    for t in user_texts:
        res = analyze_text(t)
        per_scores.append(res["score"])
        per_emotions.append(res["emotion"])
    avg = sum(per_scores)/len(per_scores) if per_scores else 0.0
    overall_label = _label_from_compound(avg)
    n = len(per_scores)
    if n == 0:
        trend = {"shift": "none", "first_mean": 0.0, "second_mean": 0.0, "diff": 0.0}
    else:
        half = max(1, n//2)
        first_mean = sum(per_scores[:half])/len(per_scores[:half]) if per_scores[:half] else 0.0
        second_mean = sum(per_scores[half:])/len(per_scores[half:]) if per_scores[half:] else 0.0
        diff = second_mean - first_mean
        if diff > 0.05:
            shift = "improving"
        elif diff < -0.05:
            shift = "worsening"
        else:
            shift = "stable"
        trend = {"shift": shift, "first_mean": first_mean, "second_mean": second_mean, "diff": diff}
    from collections import Counter
    emo_counts = Counter(per_emotions)
    dominant_emotion = emo_counts.most_common(1)[0][0] if emo_counts else "neutral"
    return {
        "overall_label": overall_label,
        "avg_score": avg,
        "per_scores": per_scores,
        "trend": trend,
        "dominant_emotion": dominant_emotion
    }
