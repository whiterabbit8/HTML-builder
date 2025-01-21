import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import readline from 'readline';

const write = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const file = path.join(__dirname, 'fileToWrite.txt');

  const writeStream = fs.createWriteStream(file);

  const rl = readline.createInterface(process.stdin, process.stdout);

  rl.question('Enter a text:\n', (answer) => {
    if (answer === 'exit') {
      rl.close();
    } else {
      writeStream.write(answer + '\n');
    }
    rl.on('line', (input) => {
      if (input === 'exit') {
        rl.close();
      } else {
        writeStream.write(input + '\n');
      }
    });
  });

  process.on('exit', () => process.stdout.write('Good luck!'));
}

await write();