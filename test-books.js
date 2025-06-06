// test-books.js
const { addBookWithGPT } = require('./books');

// Example input
const input = process.argv[2];

if (!input) {
  console.log("❗ Please provide a book title as an argument.");
  process.exit(1);
}

addBookWithGPT(input);

