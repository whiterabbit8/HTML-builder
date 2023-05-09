const fs = require('fs');
const path = require('path');
const fsPromises = fs.promises;

fs.mkdir(path.join(__dirname, 'files-copy'), { recursive: true }, (err) => {
  if (err) console.log(err);
});

fs.readdir(path.join(__dirname, 'files-copy'), (err, copies) => {
  if (err) console.log(err);

  fs.readdir(path.join(__dirname, 'files'), (err, files) => {
    if (err) console.log(err);
    files.forEach((file) => {
      fsPromises.copyFile(path.join(__dirname, 'files', file), path.join(__dirname, 'files-copy', file));
    });

    copies.forEach(copy => {
      if (!files.includes(copy)) {
        fs.rm(path.join(__dirname, 'files-copy', copy), (err) => {
          if (err) console.log(err);
        });
      }
    });
  });
});