# 🤖 Buki Bot – Personal WhatsApp Book Assistant

**Buki** is a WhatsApp-based bot for managing personal reading lists using natural language commands in Hebrew or English. It integrates with Google Sheets to log book information, status, and metadata like author, rating, and notes.

---

## ✅ What Works So Far

### 📅 Core Infrastructure

* WhatsApp bot built using `whatsapp-web.js`
* Persistent session via `LocalAuth` (QR scan only once)
* Handles messages **only from the user**
* Natural language intent recognition using a multilingual phrase dictionary

### 📚 Implemented Commands

| Command                 | Description                                                    |
| ----------------------- | -------------------------------------------------------------- |
| `Buki add Harry Potter` | Uses GPT to complete book details and logs them into the sheet |
| `Buki show books`       | Displays all books grouped by status: "read" and "to-read"     |
| `Buki help`             | Lists all supported commands                                   |

---

## ⚠️ Known Issues

### 🧠 GPT-generated book data is **inconsistent**

* Sometimes returns incorrect results (e.g., "תולדות האהבה" → *Catcher in the Rye*)
* May respond with irrelevant or empty metadata
* No validation or external verification (NLI / Google Books APIs were tested but found unreliable or sparse)

🔧 **Next step**: add user confirmation before logging book entries. In the future, we may combine multiple sources (Google Books → NLI → GPT) to improve reliability.

---

## 📌 Remaining Work

### 🛠️ Functional Commands To Implement

* [ ] `markRead`: recognize messages like `קראתי הארי פוטר` and mark book as read
* [ ] `listByAuthor`: filter and display books by a specific author
* [ ] `editBook`: update metadata for existing book entries
* [ ] `deleteBook`: remove book from the sheet
* [ ] Validate GPT results before adding book (e.g., require confirmation)
* [ ] Implement fallback API strategy: Google → NLI → GPT

### 🚀 Nice-to-Haves

* [ ] Support multi-user interaction or group-based control
* [ ] Categorize books by genre or theme
* [ ] Book recommendation engine

---

## 📆 How to Run Buki Locally

1. Clone the repo
2. Install dependencies:

   ```bash
   npm install
   ```
3. Start the bot:

   ```bash
   node whatsapp-bot.js
   ```
4. Scan the QR code once — the session will persist.

---

## 🚪 Keep It Running (Optional)

If you want Buki to keep running when the terminal is closed:

### Use `tmux` (recommended for local dev):

```bash
tmux new -s buki
node whatsapp-bot.js
```

Then press `Ctrl+B`, then `D` to detach.

### Or use `pm2`:

```bash
npm install -g pm2
pm2 start whatsapp-bot.js --name buki
```

---

## 🤔 Future Directions

We welcome PRs, feature requests, and improvements to:

* Intent recognition
* GPT integration
* Sheet management utilities
* Smarter fallback mechanisms

Built with ❤️ by readers, for readers.
