import os
from flask import Flask, request

app = Flask(__name__)


@app.route("/", methods=["GET"])
def home():
  return "Bot is running!", 200


@app.route("/webhook", methods=["GET", "POST"])
def webhook():
  # معالجة طلب التحقق (GET) من فيسبوك
  if request.method == "GET":
    verify_token = os.getenv("VERIFY_TOKEN")
    mode = request.args.get("hub.mode")
    token = request.args.get("hub.verify_token")
    challenge = request.args.get("hub.challenge")

    if mode and token:
      if mode == "subscribe" and token == verify_token:
        return challenge, 200
      else:
        return "Verification failed", 403
    return "Hello world", 200

  # معالجة الرسائل الواردة (POST) من واتساب لاحقاً
  elif request.method == "POST":
    data = request.json
    print(data)  # لطباعة الرسائل الواردة في سجلات Railway
    return "EVENT_RECEIVED", 200


if __name__ == "__main__":
  port = int(os.environ.get("PORT", 5000))
  app.run(host="0.0.0.0", port=port)
