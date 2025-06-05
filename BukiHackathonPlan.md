# Buki Bot Hackathon Plan

## Objective

Build a personal reading assistant bot (Buki) that manages a reading list using Google Sheets, with optional integrations for book search and library availability.

---

## Block Structure Overview

Development is divided into sequentially dependent **blocks**, each forming a meaningful unit of functionality. Optional blocks are noted for extension if time allows.

---

## Core Blocks

### 🔹 Block 0 – Setup & Infrastructure (COMPLETE)

**Description:** Environment setup, GitHub repo, credentials, and Google APIs

* Google Sheets API with service account
* Google Books API with `.env`
* `.gitignore`, `README.md`, `config.js`, and `googleBooks.js`
* Tested initial sheet read

**Time:** Completed pre-hackathon

---

### 🔹 Block 1 – Add Book Manually

**Goal:** Create an `addBook()` function that appends a book to the sheet

* Takes in basic data: title, author, language, status (To-Read)
* Writes to next empty row
* Adds `Added` date automatically

**Time estimate:** 45–60 mins

---

### 🔹 Block 2 – Add Book via Google Books

**Goal:** Allow input by title only; fetch the rest from Google Books API

* Use `searchBook(title)`
* Auto-fill: English title, author, language, ISBN
* Write to sheet using `addBook()` from Block 1

**Time estimate:** 60–90 mins

---

### 🔹 Block 3 – CLI Interaction

**Goal:** Simple text interface for commands like:

* `buki add "Book Name"`
* `buki list to-read`
* `buki read "Book Name"`
* `buki author "Author Name"`

**Time estimate:** 90 mins (base); refine as needed

---

### 🔹 Block 4 – Mark Book as Read

**Goal:** Update book row to set status = Read, with `Finished` date

* Locate book by name (in any language)
* Update sheet in-place

**Time estimate:** 45 mins

---

## Optional / Stretch Blocks

### 🟡 Block 5 – WhatsApp Integration

**Goal:** Chat with Buki over WhatsApp using `whatsapp-web.js`

* Mirror CLI features via chat commands
* Store phone-user mapping if needed

**Time estimate:** 2–3 hrs (depending on tooling)

---

### 🟡 Block 6 – Library Availability Scraper

**Goal:** Check which books are currently available at the public library

* Scrape by ISBN or title from catalog (Modiin site)
* Respond to command: `buki going to the library`
* Return filtered list of available to-read books

**Time estimate:** 3 hrs (if structure is consistent)

---

### 🟡 Block 7 – Book Recommendations

**Goal:** Smart sorting of "to-read" list by user-defined rules

* Random pick, recent additions, long-waiting, author clusters

**Time estimate:** 1–2 hrs

---

## Final Deliverables

* Working CLI bot that can add and update books in a Google Sheet
* Google Books enrichment
* Optional integrations (WhatsApp / Scraper)
* README + codebase + `.env.template`
* Screenshot or screen recording of working flow

---

## Notes

* Each block ends in a usable state
* Keep a consistent log in `NOTES.md`
* Use test sheet rows before writing real data

---

Let the reading  begin! 🦉📚✨

