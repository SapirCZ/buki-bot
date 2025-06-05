# 🤖 Buki – your personal reading bot

**Buki** is a simple, friendly book-tracking bot that helps you manage your reading list through a shared Google Sheet.

It’s your own assistant for remembering which books you want to read, which ones you’ve finished, and what’s available at your local library 📚

---

## ✨ Features

- 📄 Add books directly to a Google Sheet
- 🔄 Keep track of read/unread status
- 🌐 Optional: search Google Books for book info
- 📱 Future: integrate with WhatsApp to chat with Buki
- 🔎 Future: check availability in your local library automatically

---

## 🛠 Tech stack

- Node.js + `googleapis`
- Google Sheets API
- (Optional) Google Books API
- (Optional) `whatsapp-web.js` for chat interface

---

## 🧩 Structure

```bash
buki-bot/
├── test-sheets.js        # Quick script to test sheet access
├── config.js             # Stores spreadsheetId and other constants
├── service-account.json  # (ignored) Google auth key
└── ...
```

---

## ⚙️ Setup

1. Create a Google Cloud project and enable **Google Sheets API**
2. Generate a **Service Account** and share your Google Sheet with it
3. Clone this repo and run:
   ```bash
   npm install
   node test-sheets.js
   ```

---

## 🧠 Future ideas

- Auto-complete book details from Google Books
- Simple web dashboard for editing
- Notifications when new books are added
- Export to Goodreads / StoryGraph

---

## 🙋‍♀️ Creator

Built by someone who really loves books, bots, and bringing the two together 💛

---

## 📜 License

MIT – free to use, hack, and improve.

