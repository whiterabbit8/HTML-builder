const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'text.txt');

const readableStream = fs.createReadStream(file, 'utf-8');
let data = '';
readableStream.on('data', chunk => data += chunk);
readableStream.on('end', () => console.log(data));