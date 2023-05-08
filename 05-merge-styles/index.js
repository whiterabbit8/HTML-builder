const fs = require('fs');
const path = require('path');

const output = fs.createWriteStream(path.join(__dirname, 'project-dist', 'bundle.css'));

fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
  if (err) console.log(err);
  files.forEach(file => {
    if (!file.isDirectory()) {
      const type = path.extname(file.name);
      if (type === '.css') {
        const input = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
        input.on('data', chunk => output.write(chunk));
      }
    }
  });
});