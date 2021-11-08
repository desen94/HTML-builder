const fs = require('fs');
const path = require('path');

const paths = {
  styles: 'styles',
  dist: 'project-dist',
};

const buildStyles = async () => {
  const files = await fs.promises.readdir(path.join(__dirname, paths.styles), {withFileTypes: true});
  const writeStream = fs.createWriteStream(path.join(__dirname, paths.dist, 'bundle.css'), {flags: 'w'});
  await Promise.all(files.map(file => new Promise(async (res) => {
    if (file.isFile() && path.extname(path.join(__dirname, paths.styles, file.name)) === '.css') {
      const chunk = await fs.promises.readFile(path.join(__dirname, paths.styles, file.name), {encoding: 'utf-8'});
      writeStream.write(chunk);
      writeStream.write('\n');
      res();
    }
  })));
};

buildStyles();