const { google } = require('googleapis');

async function testSheets() {
  const auth = new google.auth.GoogleAuth({
    keyFile: './service-account.json',
    scopes: ['https://www.googleapis.com/auth/spreadsheets'],
  });

  const client = await auth.getClient();
  const sheets = google.sheets({ version: 'v4', auth: client });

  const spreadsheetId = '12-236uO7iceITF1An97N6VbOw3pC9xOhux1az1qKBxw';

  const res = await sheets.spreadsheets.values.get({
    spreadsheetId,
    range: 'A1:Z1',
  });

  console.log('✅ Success! Header row:', res.data.values[0]);
}

testSheets().catch(console.error);
