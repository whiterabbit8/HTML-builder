const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

const projectDist = path.join(__dirname, 'project-dist');

fs.mkdir(projectDist, { recursive: true }, err => {
  if (err) console.log(err);
});

function createCss() {
  const outputCss = fs.createWriteStream(path.join(projectDist, 'style.css'));

  fs.readdir(path.join(__dirname, 'styles'), {withFileTypes: true}, (err, files) => {
    if (err) console.log(err);
    files.forEach(file => {
      if (!file.isDirectory()) {
        const type = path.extname(file.name);
        if (type === '.css') {
          const input = fs.createReadStream(path.join(__dirname, 'styles', file.name), 'utf-8');
          input.on('data', chunk => outputCss.write(chunk));
        }
      }
    });
  });
}

createCss();

function copyAssets() {
  fs.mkdir(path.join(projectDist, 'assets'), { recursive: true }, (err) => {
    if (err) console.log(err);
  });

  fs.readdir(path.join(__dirname, 'assets'), (err, dirs) => {
    if (err) console.log(err);
    dirs.forEach((dir) => {
      fs.mkdir(path.join(projectDist, 'assets', dir), { recursive: true }, (err) => {
        if (err) console.log(err);
      });
      fs.readdir(path.join(__dirname, 'assets', dir), (err, files) => {
        if (err) console.log(err);
        files.forEach(file => {
          fsPromises.copyFile(path.join(__dirname, 'assets', dir, file), path.join(projectDist, 'assets', dir, file));
        })
      })
    });
  });
}

copyAssets();
