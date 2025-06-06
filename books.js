const { bookExistsByTitle, addBook } = require('./sheetsApi');
const { searchBookWithGPT } = require('./gptBookSearch');

/**
 * Adds a book by title if it doesn't already exist in the sheet.
 * Uses GPT to complete metadata if needed.
 * @param {string} title - Book title (any language)
 */
async function addBookWithGPT(title) {
  console.log(`🔍 Checking if "${title}" already exists...`);

  const exists = await bookExistsByTitle(title);
  if (exists) {
    console.log(`⚠️ Book "${title}" already exists in the sheet.`);
    return;
  }

  console.log(`🤖 Searching for "${title}" via GPT...`);
  const result = await searchBookWithGPT(title);

  if (!result) {
    console.log(`❌ GPT could not find metadata for "${title}".`);
    return;
  }

  const bookData = {
    titleHE: result.titleHE || '',
    titleEN: result.titleEN || '',
    authorHE: result.authorHE || '',
    authorEN: result.authorEN || '',
    isbns: (result.isbns || []).join(', '),
    language: computeLanguages(result),
    status: 'To-Read',
  };

  console.log(`📘 Adding "${title}" to the sheet...`);
  await addBook(bookData);
}

/**
 * Compute language field from available metadata fields.
 */
function computeLanguages(data) {
  const langs = [];
  if (data.titleHE || data.authorHE) langs.push('he');
  if (data.titleEN || data.authorEN) langs.push('en');
  return langs.join(',');
}

module.exports = {
  addBookWithGPT
};

