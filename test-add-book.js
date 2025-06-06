// test-add-book.js

const { addBook } = require('./sheets');

addBook({
  titleHE: 'תולדות האהבה',
  titleEN: 'The History of Love',
  authorHE: 'ניקול קראוס',
  authorEN: 'Nicole Krauss',
  language: 'he,en',
  status: 'To-Read',
  googleId: '',
});

