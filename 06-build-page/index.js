import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const fsPromises = fs.promises;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectDist = path.join(__dirname, 'project-dist');

const createCss = async () => {
  const styles = path.join(__dirname, 'styles');
  const mergedStyles = path.join(projectDist, 'style.css');
  const writeStream = fs.createWriteStream(mergedStyles);

  fs.readdir(styles, {withFileTypes: true}, (err, files) => {
    if (err) console.log(err);

    files.forEach((file) => {
      if (!file.isDirectory() && path.extname(file.name) === '.css') {
        const readStream = fs.createReadStream(path.join(styles, file.name), 'utf-8');
        readStream.on('data', chunk => writeStream.write(chunk));
      }
    });
  });
}

const copyAssets = async () => {
  const assets = path.join(__dirname, 'assets');
  const mergedAssets = path.join(projectDist, 'assets');

  fs.mkdir(mergedAssets, { recursive: true }, (err) => {
    if (err) console.log(err);
  });

  fs.readdir(assets, (err, dirs) => {
    if (err) console.log(err);

    dirs.forEach((dir) => {

      fs.mkdir(path.join(mergedAssets, dir), { recursive: true }, (err) => {
        if (err) console.log(err);
      });

      fs.readdir(path.join(assets, dir), (err, files) => {
        if (err) console.log(err);

        files.forEach((file) => {
          fs.copyFile(path.join(assets, dir, file), path.join(mergedAssets, dir, file), (err) => {
            if (err) console.log(err);
          });
        });
      });
    });
  });
}

const createHtml = async () => {
  const template = path.join(__dirname, 'template.html');
  const components = path.join(__dirname, 'components');
  const index = path.join(projectDist, 'index.html');

  let templateHtml = await fsPromises.readFile(template, 'utf-8')

  fs.readdir(components, { withFileTypes: true }, (err, files) => {
    if (err) console.log(err);

    files.forEach(async (file) => {
      if (!file.isDirectory() && path.extname(file.name) === '.html') {
        const compFile = await fsPromises.readFile(path.join(components, file.name), 'utf-8');
        templateHtml = templateHtml.replace(`{{${file.name.split('.')[0]}}}`, compFile);
        await fsPromises.writeFile(index, templateHtml);
      }
    });
  });
}

const bulidPage = async () => {
  fs.mkdir(projectDist, { recursive: true }, (err) => {
    if (err) console.log(err);
  });
  await createCss();
  await copyAssets();
  await createHtml();
}

await bulidPage();