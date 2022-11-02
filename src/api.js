const { Server } = require('socket.io');
const fs = require('fs');
const readline = require('readline');
const chokidar = require('chokidar');

const {
  isExists,
  indexPhpChecks,
  sundukInputPhpChecks,
  cssChecks,
} = require('./checks.js');
const rulesDefault = require('./rulesDefault.js');

const rules = JSON.parse(JSON.stringify(rulesDefault));

const io = new Server(3500);

console.log('Server started');

let handler = chokidar.watch('./');

io.on('connection', (socket) => {
  console.log('Connected - ' + socket.id);

  socket.on('watching', (path) => {
    handler.close();
    handler = chokidar.watch(path);
    global.folder = path;

    handler.on('add', async (path, stats) => {
      for (const check of isExists) {
        const result = await check(path, stats);

        if (result.status) rules.overall[result.key] = result.status;
      }

      await innerCheck(path, stats, socket);
    });

    handler.on('unlink', async (path, stats) => {
      for (const check of isExists) {
        const result = await check(path, stats);

        if (!result.status) rules.overall[result.key] = result.status;
      }
    });

    handler.on('unlinkDir', async (path, stats) => {
      for (const check of isExists) {
        const result = await check(path, stats);

        if (!result.status) rules.overall[result.key] = result.status;
      }
    });

    handler.on('change', async (path, stats) => {
      await innerCheck(path, stats, socket);
    });
  });
});

async function innerCheck(path, stats, socket) {
  const promises = [];

  promises.push(indexPhpCheck(path, stats));
  promises.push(sundukIndexPhpCheck(path, stats));
  promises.push(cssCheck(path, stats));

  await Promise.all(promises);

  sendUpdate(socket);
}

async function indexPhpCheck(path, stats) {
  if (!path.replace(global.folder, '').match(/^(\\|\/)index.php/)) return;

  const stream = fs.createReadStream(path);
  const rl = readline.createInterface({ input: stream });

  rules.index = JSON.parse(JSON.stringify(rulesDefault.index));

  let lineNum = 0;

  for await (const line of rl) {
    lineNum++;
    indexPhpChecks.forEach((check) => {
      const result = check(line);

      if (result)
        if (result.content)
          rules.index[result.key].push({
            file: path.replace(global.folder, '').replace(/^(\\|\/)/, ''),
            content: result.content,
            line: lineNum,
          });
        else rules.index[result.key] = result.status;
    });
  }
}

async function sundukIndexPhpCheck(path, stats) {
  if (!path.replace(global.folder, '').match(/^(\\|\/)SUNDUK(\\|\/)index.php/))
    return;

  const stream = fs.createReadStream(path);
  const rl = readline.createInterface({ input: stream });

  rules.sundukIndex = JSON.parse(JSON.stringify(rulesDefault.sundukIndex));

  let lineNum = 0;

  for await (const line of rl) {
    lineNum++;
    sundukInputPhpChecks.forEach((check) => {
      const result = check(line);

      if (result)
        if (result.content)
          rules.sundukIndex[result.key].push({
            file: path.replace(global.folder, '').replace(/^(\\|\/)/, ''),
            content: result.content,
            line: lineNum,
          });
        else rules.sundukIndex[result.key] = result.status;
    });
  }
}

async function cssCheck(path, stats) {
  if (!path.replace(global.folder, '').match(/.css$/)) return;

  const stream = fs.createReadStream(path);
  const rl = readline.createInterface({ input: stream });

  rules.css = JSON.parse(JSON.stringify(rulesDefault.css));

  let lineNum = 0;

  for await (const line of rl) {
    lineNum++;
    cssChecks.forEach((check) => {
      const result = check(line);

      if (result)
        rules.css[result.key].push({
          file: path,
          content: result.content,
          line: lineNum,
        });
    });
  }
}

async function sendUpdate(socket) {
  socket.emit('update', rules);
}
