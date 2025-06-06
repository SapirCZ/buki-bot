require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

/**
 * Fetch book metadata from GPT based on title.
 * @param {string} title - Book title (any language)
 * @returns {Promise<object|null>} bookData in expected format or null
 */
async function searchBookWithGPT(title) {
const prompt = `
The user entered a string that might contain the name of a book, its author, or both – possibly in Hebrew, English, or mixed.

Your task is to identify (if possible) the following metadata:

- titleHE: the book’s title in Hebrew
- titleEN: the book’s title in English
- authorHE: the author’s name in Hebrew
- authorEN: the author’s name in English
- isbns: an array of valid ISBN numbers if known

If you cannot identify something, leave it blank ("") or as an empty array. Do not guess. Only return a valid JSON object.

`;


  try {
    const chatCompletion = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
    });

    const response = chatCompletion.choices[0].message.content;
    console.log("📘 GPT response:");
    console.log(response);

    const parsed = JSON.parse(response);
    return parsed;

  } catch (error) {
    console.error('❌ GPT Error:', error.message);
    return null;
  }
}

module.exports = { searchBookWithGPT };

