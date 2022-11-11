const { Server } = require('socket.io');
const fs = require('fs');
const readline = require('readline');
const chokidar = require('chokidar');
const { rules, result } = require('./config.js');

const io = new Server(3500);

console.log('Server started');

let handler = chokidar.watch('./');

io.on('connection', (socket) => {
  console.log('Connected - ' + socket.id);
  global.socket = socket;

  socket.on('watching', (path) => {
    result.reset();
    handler.close();
    handler = chokidar.watch(path);
    global.folder = path;
    console.log(`Watching ${path}`);

    handler.on('add', onAdd);
    handler.on('addDir', onAddDir);
    handler.on('unlink', onUnlink);
    handler.on('unlinkDir', onUnlinkDir);
    handler.on('change', onChange);
  });
});

async function onAdd(path, stats) {
  Object.entries(rules).forEach(([key, checks]) => {
    if (key !== 'common') return checkFile(path, key);

    checks.fileExists.forEach((rule) => {
      result.common[rule.key].message = `Наличие файла ${rule.fileName}`;
      result.common[rule.key].status =
        result.common[rule.key].status === 'check'
          ? result.common[rule.key].status
          : path.match(rule.query)
          ? 'check'
          : 'error';
    });

    checks.fileDoesntExist.forEach((rule) => {
      result.common[rule.key].message = `Отсутствие файла ${rule.fileName}`;
      result.common[rule.key].status =
        result.common[rule.key].status === 'error'
          ? result.common[rule.key].status
          : path.match(rule.query)
          ? 'error'
          : 'check';
      if (!result.common[rule.key].errors) result.common[rule.key].errors = [];
      if (path.match(rule.query))
        result.common[rule.key].errors.push(path.replace(global.folder, ''));
    });
  });

  sendUpdate(global.socket);
}

async function onAddDir(path, stats) {
  rules.common.folderExists.forEach((rule) => {
    result.common[rule.key].message = `Наличие папки ${rule.name}`;
    result.common[rule.key].status =
      result.common[rule.key].status === 'check'
        ? result.common[rule.key].status
        : path.match(rule.query)
        ? 'check'
        : 'error';
  });

  rules.common.folderDoesntExist.forEach((rule) => {
    result.common[rule.key].message = `Отсутствие папки ${rule.name}`;
    result.common[rule.key].status =
      result.common[rule.key].status === 'error'
        ? result.common[rule.key].status
        : path.match(rule.query)
        ? 'error'
        : 'check';
    if (!result.common[rule.key].errors) result.common[rule.key].errors = [];
    if (path.match(rule.query))
      result.common[rule.key].errors.push(path.replace(global.folder, ''));
  });
}

async function onUnlink(path, stats) {
  rules.common.fileExists.forEach((rule) => {
    result.common[rule.key].message = `Наличие файла ${rule.fileName}`;
    result.common[rule.key].status =
      result.common[rule.key].status === 'error'
        ? result.common[rule.key].status
        : path.match(rule.query)
        ? 'error'
        : 'check';
  });

  rules.common.fileDoesntExist.forEach((rule) => {
    result.common[rule.key].message = `Отсутствие файла ${rule.fileName}`;
    if (result.common[rule.key]?.errors.length < 2)
      result.common[rule.key].status =
        result.common[rule.key].status === 'check'
          ? result.common[rule.key].status
          : path.match(rule.query)
          ? 'check'
          : 'error';
    if (!result.common[rule.key].errors) result.common[rule.key].errors = [];
    if (path.match(rule.query)) {
      result.common[rule.key].errors = result.common[rule.key].errors.filter(
        (error) => error !== path.replace(global.folder, '')
      );
    }
  });
}

async function onUnlinkDir(path, stats) {
  rules.common.folderExists.forEach((rule) => {
    result.common[rule.key].message = `Наличие папки ${rule.name}`;
    result.common[rule.key].status =
      result.common[rule.key].status === 'error'
        ? result.common[rule.key].status
        : path.match(rule.query)
        ? 'error'
        : 'check';
  });

  rules.common.folderDoesntExist.forEach((rule) => {
    result.common[rule.key].message = `Отсутствие папки ${rule.name}`;
    if (result.common[rule.key]?.errors.length < 2)
      result.common[rule.key].status =
        result.common[rule.key].status === 'check'
          ? result.common[rule.key].status
          : path.match(rule.query)
          ? 'check'
          : 'error';
    if (!result.common[rule.key].errors) result.common[rule.key].errors = [];
    if (path.match(rule.query)) {
      result.common[rule.key].errors = result.common[rule.key].errors.filter(
        (error) => error !== path.replace(global.folder, '')
      );
    }
  });
}

async function onChange(path, stats) {
  Object.entries(rules).forEach(([key, checks]) => {
    if (key === 'common') return;

    checkFile(path, key);
  });
}

const checkFile = async (path, key) => {
  const shortPath = path.replace(global.folder, '');
  if (!shortPath.match(rules[key].query)) return;

  const stream = fs.createReadStream(path);
  const rl = readline.createInterface({ input: stream });

  let lineNum = 0;
  const promises = [];

  for (const rule in result[key]) {
    result[key][rule].errors = null;
    result[key][rule].status = null;
  }

  rules[key].linesEquality.forEach((rule) => {
    result[key][rule.key].firstValue = null;
    result[key][rule.key].secondValue = null;
  });

  rules[key].lineCorrectness.forEach((rule) => {
    if (!rules[key].isGroup) return (result[key][rule.key].status = 'check');

    result[shortPath] = {};
    result[shortPath][rule.key] = {};
    result[shortPath][rule.key].status = 'check';
  });

  for await (const line of rl) {
    lineNum++;

    promises.push(checkLineExists(line, key));
    promises.push(checkLineDoesntExist(line, lineNum, key));
    promises.push(checkLinesEquality(line, key));
    promises.push(checkLineCorrectness(line, lineNum, key, shortPath));
  }

  await Promise.all(promises);

  rules[key].linesEquality.forEach((rule) => {
    const firstValue = rule.firstValue
      ? rule.firstValue
      : result[key][rule.key].firstValue;
    const secondValue = rule.secondValue
      ? rule.secondValue
      : result[key][rule.key].secondValue;

    result[key][rule.key].message = rule.name;

    if (firstValue !== secondValue)
      return (result[key][rule.key].status = 'error');

    result[key][rule.key].status = 'check';
  });
};

const checkLineExists = async (line, key) => {
  rules[key].lineExists.forEach((rule) => {
    result[key][rule.key].message = `Наличие ${rule.name}`;
    result[key][rule.key].status =
      result[key][rule.key].status === 'check'
        ? result[key][rule.key].status
        : line.match(rule.query)
        ? 'check'
        : 'error';
  });
};

const checkLineDoesntExist = async (line, lineNum, key) => {
  rules[key].lineDoesntExist.forEach((rule) => {
    result[key][rule.key].message = `Отсутствие ${rule.name}`;
    result[key][rule.key].status =
      result[key][rule.key].status === 'error'
        ? result[key][rule.key].status
        : line.match(rule.query)
        ? 'error'
        : 'check';
    if (!result[key][rule.key].errors) result[key][rule.key].errors = [];
    if (line.match(rule.query))
      result[key][rule.key].errors.push({
        content: line.trim(),
        line: lineNum,
        file: key,
      });
  });
};

const checkLinesEquality = async (line, key) => {
  rules[key].linesEquality.forEach((rule) => {
    if (rule.firstLine && line.match(rule.firstLine))
      result[key][rule.key].firstValue = rule.firstExtractor(line);

    if (rule.secondLine && line.match(rule.secondLine))
      result[key][rule.key].secondValue = rule.secondExtractor(line);
  });
};

const checkLineCorrectness = async (line, lineNum, key, path) => {
  try {
    if (rules[key].isGroup) {
      rules[key].lineCorrectness.forEach((rule) => {
        result[path][rule.key].message = rule.name;
        if (line.match(rule.lineQuery))
          result[path][rule.key].status =
            result[path][rule.key].status === 'error'
              ? result[path][rule.key].status
              : line.match(rule.targetQuery)
              ? 'check'
              : 'error';
        if (!result[path][rule.key].errors) result[path][rule.key].errors = [];
        if (line.match(rule.lineQuery) && !line.match(rule.targetQuery))
          result[path][rule.key].errors.push({
            content: line.trim(),
            line: lineNum,
            file: path,
          });
      });
      return;
    }
    rules[key].lineCorrectness.forEach((rule) => {
      result[key][rule.key].message = rule.name;
      if (line.match(rule.lineQuery))
        result[key][rule.key].status =
          result[key][rule.key].status === 'error'
            ? result[key][rule.key].status
            : line.match(rule.targetQuery)
            ? 'check'
            : 'error';
      if (!result[key][rule.key].errors) result[key][rule.key].errors = [];
      if (line.match(rule.lineQuery) && !line.match(rule.targetQuery))
        result[key][rule.key].errors.push({
          content: line.trim(),
          line: lineNum,
          file: key,
        });
    });
  } catch (err) {
    console.error(err);
  }
};

async function sendUpdate(socket) {
  socket.emit('update', result);
}
