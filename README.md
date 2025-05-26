# 🚨 NOTE: You Can Test My Live Bot @addybite_bot

I have published this project online.  
👉 To try it out, **add `@addybite_bot` to a Telegram group** and disable privacy mode via [@BotFather](https://t.me/BotFather).  
The bot will respond to skincare-related product recommendation requests using OpenAI GPT.

🧪 **Testable products currently in the database** *(as of 26 May 2025)*:
- Face wash  
- Peeling serum  
- Lip balm

## 🚧 Current Limitations
- 🗨️ **Single Chat Context Only**:  
  The bot currently only works with messages **contained within a single message**. It does not track or interpret intent spread across multiple sequential messages (i.e., no session or conversational memory yet).
  
---

# 🧴 AddyBite Bot – Skincare Recommendation Chatbot

A Telegram bot for **skincare product recommendations**. It uses OpenAI to detect user intent, search vector embeddings from a product database, and reply like a helpful friend. Built with Express.js, PostgreSQL, and OpenAI APIs.

---

## 💡 Features

- Detects if a message is asking for product help  
- Uses OpenAI embeddings to search for best-fit products  
- Picks the most suitable one from top 3 candidates  
- Responds casually, like a real person helping a friend  
- Works in group chats (no need for `/commands`)  

---

## 🛠️ Requirements

- Node.js v16+
- PostgreSQL database with a `products` table
- OpenAI API key
- Telegram bot token ([via BotFather](https://t.me/BotFather))
- Public URL (use [ngrok](https://ngrok.com) for local dev)

---

## 🚀 Getting Started

### 1. Clone the project

```
git clone https://github.com/tambunjb/addybite_bot.git
cd addybite-bot
```

### 2. Install dependencies

```
npm install
```

### 3. Set up environment

Rename `.env.template` to `.env`:

```
cp .env.template .env
```

Fill in your `.env`:

```
PORT=3000
TELEGRAM_TOKEN=your_telegram_bot_token
OPENAI_API_KEY=your_openai_api_key
WEBHOOK_BASE=https://your-ngrok-or-server-url
WEBHOOK_SECRET=any-unique-string

DB_HOST=localhost
DB_USER=your_db_user
DB_PASS=your_db_pass
DB_NAME=your_db_name
```

---

### 4. Prepare the Database

You must already have a PostgreSQL database with a `products` table.

Example schema:

```sql
CREATE TABLE products (
  id SERIAL PRIMARY KEY,
  description TEXT NOT NULL,
  embedding TEXT NOT NULL
);
```

> Note: `embedding` is stored as a stringified array.

---

### 5. Run the bot

```
node src/index.js
```

Terminal should show:

```
🚀 AddyBite bot running on port 3000
✅ Webhook set: https://your-url/webhook/your-secret
```

---

## 🤖 How to Use the Bot

1. **Add your bot to a Telegram group**
2. Go to [@BotFather](https://t.me/BotFather)
3. Run `/setprivacy`, choose your bot, and set privacy to `Disabled`
4. Ask a skincare-related question like:

```
My skin gets dry in winter. Any face moisturizer you’d recommend?
```

✅ If intent is detected, the bot will find matching products from the database and reply with a friendly message suggesting one.

---

## 🧠 How It Works

1. Detects user intent via OpenAI (`gpt-4`)
2. Embeds the query using `text-embedding-3-small`
3. Searches top 3 most similar product descriptions from database
4. Asks GPT to pick the best option or say “none”
5. Rephrases result like a friendly recommendation
6. Sends the message in the Telegram group

---

## 📂 Folder Structure

```
src/
├── config/         # Loads environment variables and config
├── db/             # PostgreSQL connection
├── services/       # OpenAI + Telegram logic
├── webhook/        # Telegram webhook handler
└── index.js        # Entry point
```

---

## 🔐 Security Notes

- DO NOT share your `.env` file
- The webhook URL includes a secret — keep it private
- Disable Telegram bot privacy mode so it can read group messages

---

## 🧪 Optional: Use ngrok for Local Testing

```
npx ngrok http 3000
```

Use the generated HTTPS URL as `WEBHOOK_BASE` in your `.env`.

---

## 🤝 License

MIT – free to use, adapt, or contribute.