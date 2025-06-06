## 🛠️ Project Progress Overview

### ✅ Block 0: Infrastructure Setup

* Google Sheets API was initialized and connected using a service account
* `.env` and `config.js` files created for credential management
* Google Sheet structure defined with columns for Hebrew/English titles, authors, ISBNs, and more
* Verified read/write access to the sheet

### ✅ Block 1: Manual Book Addition

* Created `addBook(bookData)` function in `sheets-api.js`
* Prevents duplicate additions by checking both Hebrew and English titles
* Fully tested with a custom test runner (`test-sheets-api.js`)
* Added support for writing new rows with sequential ID and metadata

---

### 🔄 Block 2: Automatic Metadata Completion via API

Initially, we aimed to allow users to enter a raw title (Hebrew or English), and automatically complete its metadata (author, translation, ISBNs) using external sources.

We tested 3 data sources:

#### 📚 Google Books API

* Pros: Rich metadata, consistent structure
* Cons: Poor Hebrew support, no direct mapping between Hebrew and English editions, difficult to query fuzzy titles

#### 📖 National Library of Israel API (NLI)

* Pros: Hebrew-focused, credible source
* Cons: Extremely limited, unstable results (500 errors), lacking many popular books

#### 🤖 ChatGPT API (current)

* Pros: Handles fuzzy input, understands mixed Hebrew/English queries
* Cons: Hallucinates answers, invents authors/translations, lacks consistency or confidence estimation

---

### 🧭 Where We Are Now

* We currently use ChatGPT to fill in metadata, but the quality is **unreliable**.
* In many cases, it inserts wrong authors (e.g., “Ernest Hemingway” for random Hebrew titles) or generic English classics (e.g., “The Catcher in the Rye”) when uncertain.

---

### 💡 Proposed Future Flow

In future versions, the system will:

* Try to query **Google Books API**, then fallback to:
* **NLI API**, then finally to:
* **ChatGPT**

The results from all sources will be compared, and the user will be presented with:

* Suggested metadata from the **most confident or consistent source**
* A chance to approve or edit before committing to the sheet

