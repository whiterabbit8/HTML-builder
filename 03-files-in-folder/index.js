import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const showFiles = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const dir = path.join(__dirname, 'secret-folder\\');

  fs.readdir(dir, {withFileTypes: true}, (err, files) => {
    if (err) {
      console.log(err);
    } else {
      files.forEach((file) => {
        if (!file.isDirectory()) {
          const type = path.extname(file.name).slice(1);
          const name = file.name.replace(`.${type}`, '');
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
}

await showFiles();
