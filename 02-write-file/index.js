const {createWriteStream} = require('fs');
const path = require('path');
const readline = require('readline');
const {stdin: input, stdout: output} = require('process');


const rl = readline.createInterface({input, output});

const writeStream = createWriteStream(path.join(__dirname, 'text.txt'), {flags: 'a'});

rl.question('Hey dude! How are your? \n', answer => {
  exit(answer) && writer(answer);
});

rl.on('line', line => {
  exit(line) && writer(line);
});

rl.on('SIGINT', () => {
  exit('exit');
});

const writer = (data) => {
  writeStream.write(data);
  writeStream.write('\n');
};

const exit = data => {
  if (data === 'exit') {
    process.stdout.write('\n Super! Good luck!');
    writeStream.end();
    rl.close();
    return false;
  }
  return true;
};
