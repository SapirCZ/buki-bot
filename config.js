// config.js

const { google } = require('googleapis');
const path = require('path');

// Service-account credentials for Sheets API
const auth = new google.auth.GoogleAuth({
  keyFile: path.join(__dirname, 'service-account.json'),
  scopes: ['https://www.googleapis.com/auth/spreadsheets'],
});

module.exports = {
  auth,
  spreadsheetId: '12-236uO7iceITF1An97N6VbOw3pC9xOhux1az1qKBxw',
  defaultLang: 'HE',
  statusValues: ['To-Read', 'Read'],
};

