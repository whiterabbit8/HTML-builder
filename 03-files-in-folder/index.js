const fs = require('fs');
const path = require('path');

const dir = path.join(__dirname, 'secret-folder\\');
console.log(dir);
fs.readdir(dir, {withFileTypes: true}, (err, files) => {
  if (err) {
    console.log(err);
  } else {
    files.forEach(file => {
      if (!file.isDirectory()) {
        const name = file.name.split('.')[0];
        const type = path.extname(file.name).slice(1);
        fs.stat(`${dir + file.name}`, (err, stats) => {
          if (err) {
            console.log(err);
          } else {
            console.log(`${name} - ${type} - ${stats.size}b`);
          }
        });
      }
    });
  }
});