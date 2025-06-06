require('dotenv').config();
const { OpenAI } = require('openai');

const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

async function helloGPT() {
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: "שלום GPT! מה שלומך היום?" }],
  });

  console.log("🤖 GPT says:", response.choices[0].message.content);
}

helloGPT();

