// sheets-api.js (renamed from sheets.js)

const { google } = require('googleapis');
const { auth } = require('./config');

const spreadsheetId = '12-236uO7iceITF1An97N6VbOw3pC9xOhux1az1qKBxw';
const SHEET_NAME = 'books';

const sheets = google.sheets({ version: 'v4', auth });

/** CREATE: Add a new book (with duplicate check) */
async function addBook(bookData) {
  const exists = await bookExistsByTitle(bookData.titleHE || bookData.titleEN);
  if (exists) {
    console.log(`⚠️ Book "${bookData.titleHE || bookData.titleEN}" already exists.`);
    return;
  }

  const idRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_NAME}!A2:A`,
  });
  const nextId = (idRes.data.values?.length || 0) + 1;

  const row = [
    nextId,
    bookData.titleHE || '',
    bookData.titleEN || '',
    bookData.authorHE || '',
    bookData.authorEN || '',
    bookData.language || '',
    bookData.status || 'To-Read',
    new Date().toISOString().split('T')[0],
    '',
    bookData.isbns || '',
    bookData.notes || '',
    bookData.rate || '',
  ];

  await sheets.spreadsheets.values.append({
    spreadsheetId,
    range: `${SHEET_NAME}!A2:L`,
    valueInputOption: 'RAW',
    insertDataOption: 'INSERT_ROWS',
    resource: { values: [row] },
  });

  console.log(`✅ Book "${bookData.titleHE || bookData.titleEN}" added with ID ${nextId}`);
}

/** READ: Get all books from the sheet */
async function getAllBooks() {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_NAME}!A2:L`,
  });
  return res.data.values || [];
}

/** UPDATE: Update a book row by title (exact match) */
async function updateBook(title, updates) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_NAME}!A2:L`,
  });

  const rows = res.data.values || [];
  const rowIndex = rows.findIndex(row =>
    row[1]?.toLowerCase() === title.toLowerCase() || // Title_HE
    row[2]?.toLowerCase() === title.toLowerCase()    // Title_EN
  );

  if (rowIndex === -1) {
    console.log(`❌ Book "${title}" not found.`);
    return;
  }

  const row = rows[rowIndex];
  const updatedRow = [
    row[0],
    updates.titleHE || row[1],
    updates.titleEN || row[2],
    updates.authorHE || row[3],
    updates.authorEN || row[4],
    updates.language || row[5],
    updates.status || row[6],
    row[7], // keep original added date
    updates.finished || row[8],
    updates.isbns || row[9],
    updates.notes || row[10],
    updates.rate || row[11],
  ];

  const range = `${SHEET_NAME}!A${rowIndex + 2}:L${rowIndex + 2}`;
  await sheets.spreadsheets.values.update({
    spreadsheetId,
    range,
    valueInputOption: 'RAW',
    resource: { values: [updatedRow] },
  });

  console.log(`🔄 Book "${title}" updated.`);
}

/** DELETE: Remove a book by title */
async function deleteBook(title) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_NAME}!A2:L`,
  });

  const rows = res.data.values || [];
  const rowIndex = rows.findIndex(row =>
    row[1]?.toLowerCase() === title.toLowerCase() ||
    row[2]?.toLowerCase() === title.toLowerCase()
  );

  if (rowIndex === -1) {
    console.log(`❌ Book "${title}" not found.`);
    return;
  }

  const range = `${SHEET_NAME}!A${rowIndex + 2}:L${rowIndex + 2}`;
  await sheets.spreadsheets.values.clear({
    spreadsheetId,
    range,
  });

  console.log(`🗑️ Book "${title}" deleted.`);
}

/** Utility: Check if book title exists */
async function bookExistsByTitle(title) {
  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: `${SHEET_NAME}!B2:C`,
  });

  const rows = res.data.values || [];
  const flatTitles = rows.flat().map(val => val.trim().toLowerCase());
  return flatTitles.includes(title.trim().toLowerCase());
}

module.exports = {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
  bookExistsByTitle,
};

