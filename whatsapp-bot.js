process.env.DEBUG = 'whatsapp*';

const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const { addBookWithGPT } = require('./books');
const { getAllBooks } = require('./sheetsApi');

// === Intent dictionary ===
const intents = {
  add: ['הוסף', 'תוסיף', 'add', 'add book', 'בוקי תוסיף', 'buki add'],
  markRead: ['קראתי', 'סיימתי לקרוא', 'read', 'finished reading'],
  listAll: ['הצג ספרים', 'תראה ספרים', 'show books', 'list books', 'buki list'],
  listByAuthor: ['ספרים של', 'books by', 'הצג ספרים של', 'list books by'],
  edit: ['ערוך', 'עדכן', 'edit', 'update book'],
  delete: ['מחק', 'הסר', 'delete', 'remove book'],
  help: ['עזרה', 'מה אתה יודע לעשות', 'פקודות', 'buki help', 'help']
};

// Detect intent from message content
function detectIntent(text) {
  const lowerText = text.toLowerCase();
  for (const [intent, phrases] of Object.entries(intents)) {
    if (phrases.some(phrase => lowerText.includes(phrase.toLowerCase()))) {
      return intent;
    }
  }
  return null;
}

// Check if the message starts with a "buki" trigger
function isBukiCommand(text) {
  const prefixPattern = /^(בוקי|buki|buky|booky)/i;
  return prefixPattern.test(text.trim());
}

// === WhatsApp Client Setup ===
const client = new Client({
  authStrategy: new LocalAuth({ clientId: 'buki-session' }),
  puppeteer: { headless: true }
});

client.on('qr', qr => {
  console.log('🟡 Scan the QR code below to authenticate:');
  qrcode.generate(qr, { small: true });
});

client.on('ready', () => {
  console.log('✅ WhatsApp bot is ready!');
});

client.on('message_create', async message => {
  if (!message.fromMe) return;

  const text = message.body.trim();

  if (!isBukiCommand(text)) {
    console.log(`⏭ Ignoring non-Buki message: "${text}"`);
    return;
  }

  console.log(`🤖 Buki command received: "${text}"`);

  const intent = detectIntent(text);

  if (!intent) {
    await message.reply('🤷‍♂️ Command not recognized. Try: "בוקי הוסף הארי פוטר" or "Buki I read Ulysses".');
    return;
  }

  switch (intent) {
    case 'add': {
      const title = text
        .replace(/^(בוקי|buki|buky|booky)/i, '')
        .replace(/add|הוסף|תוסיף/i, '')
        .trim();

      await message.reply(`📚 Adding book: "${title}"...`);
      try {
        await addBookWithGPT(title);
        await message.reply(`✅ Book "${title}" was processed.`);
      } catch (err) {
        console.error('❌ Error in addBookWithGPT:', err.message);
        await message.reply(`❌ Failed to process "${title}".`);
      }
      break;
    }

    case 'listAll': {
      try {
        const books = await getAllBooks();

        const read = [];
        const unread = [];

        books.forEach(row => {
          const title = row[1] || row[2] || 'Untitled';
          const author = row[3] || row[4] || '';
          const status = (row[6] || '').toLowerCase();
          const rate = row[11] || '';

          if (status === 'read') {
            read.push(`✅ ${title} / ${author}` + (rate ? ` / ⭐️ ${rate}` : ''));
          } else {
            unread.push(`📖 ${title} / ${author}`);
          }
        });

        let msg = '';
        if (read.length > 0) {
          msg += '*✅ Read books:*\n' + read.join('\n') + '\n\n';
        }
        if (unread.length > 0) {
          msg += '*📖 To-read books:*\n' + unread.join('\n');
        }

        if (!msg) msg = '📚 No books found.';

        await message.reply(msg);
      } catch (err) {
        console.error('❌ Error in getAllBooks:', err.message);
        await message.reply('❌ Failed to fetch book list.');
      }
      break;
    }

    case 'help':
      await message.reply(
        `📖 Commands Buki understands:\n` +
        `• הוסף <book name>\n` +
        `• קראתי <book name>\n` +
        `• הצג ספרים / ספרים של <author>\n` +
        `• מחק / ערוך ספר\n` +
        `• עזרה`
      );
      break;

    default:
      await message.reply(`📌 Command "${intent}" is not implemented yet – but it's on the way 😉`);
  }
});

console.log("🚀 Initializing WhatsApp client...");
client.initialize();

