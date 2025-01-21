import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const read = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const file = path.join(__dirname, 'text.txt');

  const readableStream = fs.createReadStream(file, 'utf-8');
  let data = '';
  readableStream.on('data', chunk => data += chunk);
  readableStream.on('end', () => console.log('\n' + data));
}

await read();