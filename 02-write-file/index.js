const fs = require('fs');
const path = require('path');
const { stdout } = process;
const readline = require('readline');

const file = path.join(__dirname, 'text.txt');
const output = fs.createWriteStream(file);

const rl = readline.createInterface(process.stdin, process.stdout);

rl.question('Введите текст:\n', (answer) => {
  output.write(answer + '\n');
  rl.on('line', (input) => {
    output.write(input + '\n');
  });
});

process.on('exit', () => stdout.write('Удачи!'));
