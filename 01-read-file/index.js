const {createReadStream} = require('fs');
const path = require('path');

const readStream = createReadStream(path.join(__dirname, 'text.txt'), 'utf-8');
readStream.on('data', (chunk) => {
  process.stdout.write(chunk);
});