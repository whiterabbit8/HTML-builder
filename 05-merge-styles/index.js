import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const mergeStyles = async () => {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const styles = path.join(__dirname, 'styles');
  const bundle = path.join(__dirname, 'project-dist', 'bundle.css');
  const writeStream = fs.createWriteStream(bundle);

  fs.readdir(styles, {withFileTypes: true}, (err, files) => {
    if (err) console.log(err);

    files.forEach((file) => {
      if (!file.isDirectory()) {
        const type = path.extname(file.name);
        if (type === '.css') {
          const readStream = fs.createReadStream(path.join(styles, file.name), 'utf-8');
          readStream.on('data', (chunk) => writeStream.write(chunk));
        }
      }
    });
  });
}

await mergeStyles();
