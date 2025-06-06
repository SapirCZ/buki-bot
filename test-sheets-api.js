const {
  addBook,
  getAllBooks,
  updateBook,
  deleteBook,
  bookExistsByTitle,
} = require('./sheetsApi');

const TEST_TITLE = '📘 Buki Test Book';
const TEST_DATA = {
  titleHE: TEST_TITLE,
  titleEN: 'Buki Test Book',
  authorHE: 'מחבר טסט',
  authorEN: 'Test Author',
  language: 'he,en',
  status: 'To-Read',
  isbns: '1234567890',
  notes: 'This is a test book',
  rate: '5',
};

async function runTests() {
  console.log('🔁 Running Sheets API Tests...\n');

  console.log('1️⃣ Checking if book exists (should not)...');
  const existsBefore = await bookExistsByTitle(TEST_TITLE);
  console.log('   Exists?', existsBefore); // Expected: false

  console.log('2️⃣ Adding book...');
  await addBook(TEST_DATA);

  console.log('3️⃣ Checking if book exists (should exist)...');
  const existsAfter = await bookExistsByTitle(TEST_TITLE);
  console.log('   Exists?', existsAfter); // Expected: true

  console.log('4️⃣ Reading all books...');
  const books = await getAllBooks();
  const added = books.find(
    row => row[1] === TEST_TITLE || row[2] === TEST_DATA.titleEN
  );
  console.log('   Found added book?', !!added);

  console.log('5️⃣ Updating book...');
  await updateBook(TEST_TITLE, {
    notes: 'Updated notes',
    rate: '10',
    status: 'Read',
    finished: new Date().toISOString().split('T')[0],
  });

  console.log('6️⃣ Deleting book...');
  await deleteBook(TEST_TITLE);

  console.log('7️⃣ Checking if book exists after deletion...');
  const existsAfterDelete = await bookExistsByTitle(TEST_TITLE);
  console.log('   Exists?', existsAfterDelete); // Expected: false

  console.log('\n✅ All tests completed.');
}

runTests();

