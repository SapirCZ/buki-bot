// sheets.js

const { google } = require('googleapis'); // Load Google APIs client library
const { auth } = require('./config');     // Load the authorized client from config.js

// spreadsheet ID
const spreadsheetId = '12-236uO7iceITF1An97N6VbOw3pC9xOhux1az1qKBxw';

/**
 * Adds a book entry to the Google Sheet.
 * @param {Object} bookData - The book data to insert.
 * @param {string} bookData.titleHE - Title in Hebrew (optional).
 * @param {string} bookData.titleEN - Title in English (optional).
 * @param {string} bookData.authorHE - Author in Hebrew (optional).
 * @param {string} bookData.authorEN - Author in English (optional).
 * @param {string} bookData.language - Book language (e.g., "Hebrew", "English").
 * @param {string} bookData.status - Reading status (default: "to-read").
 * @param {string} bookData.googleId - Google Books volume ID (optional).
 */

async function addBook(bookData) {
  const sheets = google.sheets({ version: 'v4', auth }); // Create Sheets API client


  // ---------- START DUPLICATE CHECK ----------

  const existingRes = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'books!B2:C',    // B = Title_HE, C = Title_EN (skip header row B1:C1)
  });

  // Convert the nested arrays into two flat arrays:
  //   [ ['TitleHE1', 'TitleEN1'], ['TitleHE2', 'TitleEN2'], … ]
  const rows = existingRes.data.values || [];  
  const existingTitlesHE = rows.map(row => row[0] || '').filter(txt => txt.trim() !== '');
  const existingTitlesEN = rows.map(row => row[1] || '').filter(txt => txt.trim() !== '');

  // 3) Check if either new titleHE OR titleEN already exists
  if (
    (bookData.titleHE && existingTitlesHE.includes(bookData.titleHE)) ||
    (bookData.titleEN && existingTitlesEN.includes(bookData.titleEN))
  ) {
    console.log(`⚠️ Duplicate detected. "${bookData.titleHE || bookData.titleEN}" already exists.`);
    return;  // Exit early, do not append a new row
  }
  // ---------- END DUPLICATE CHECK ----------


 // Read the first column (ID column) to know how many rows are filled
  const idRes = await sheets.spreadsheets.values.get({
  spreadsheetId,
  range: 'books!A2:A',            // all IDs (skip header A1)
  });
  const nextId = (idRes.data.values?.length || 0) + 1; // sequential ID
  /* ------------------------------------------- */

  const row = [
  nextId,                         // <-- ID goes to column A
  bookData.titleHE  || '',             // B
  bookData.titleEN || '',
  bookData.authorHE || '',
  bookData.authorEN || '',
  bookData.language || '',
  bookData.status || 'To-Read',
  new Date().toISOString().split('T')[0], // Added date
  '',                        // Finished (blank for now)
  bookData.isbns || '',      // ISBNs
  bookData.notes || '',      // Notes
  bookData.rate || '',       // rate
];

  try {
    await sheets.spreadsheets.values.append({
      spreadsheetId,
      range: 'books!A2:L',
      valueInputOption: 'RAW',
      insertDataOption: 'INSERT_ROWS',
      resource: {
        values: [row],
      },
    });

     console.log(`✅ Book “${bookData.titleHE || bookData.titleEN}” added with ID ${nextId}`);
  } catch (error) {
    console.error('❌ Error adding book:', error);
  }
}

module.exports = { addBook };

