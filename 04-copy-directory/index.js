import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const copy = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dir = path.join(__dirname, 'files');
  const dest = path.join(__dirname, 'files-copy');

  fs.mkdir(dest, { recursive: true }, (err) => {
    if (err) console.log(err);
  });

  fs.readdir(dest, (err, copies) => {
    if (err) console.log(err);

    fs.readdir(dir, (err, files) => {
      if (err) console.log(err);
      files.forEach((file) => {
        fs.copyFile(path.join(dir, file), path.join(dest, file), (err) => {
          if (err) console.log(err);
        });
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
}

await copy();
