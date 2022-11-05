const rules = {
  common: {
    fileExists: [
      {
        key: 'index',
        fileName: 'index.php',
        query: /(\\|\/)index\.php/,
      },
      {
        key: 'favicon',
        fileName: 'favicon.ico',
        query: /(\\|\/)favicon\.ico/,
      },
      {
        key: 'domonet',
        fileName: 'domonet.js',
        query: /(\\|\/)js(\\|\/)domonet\.js/,
      },
      {
        key: 'sundukDomonet',
        fileName: 'domonet.js в сундуке',
        query: /(\\|\/)SUNDUK(\\|\/)js(\\|\/)domonet\.js/,
      },
      {
        key: 'jquery',
        fileName: 'jquery.min.js',
        query: /(\\|\/)js(\\|\/)jquery\.min\.js/,
      },
    ],
    fileDoesntExist: [
      {
        key: 'price',
        fileName: 'price.js',
        query: /price\.js/,
      },
      {
        key: 'generator',
        fileName: 'generator.js',
        query: /generator\.js/,
      },
    ],
    folderExists: [
      {
        key: 'confirm',
        name: 'confirm',
        query: /confirm/,
        location: /(\\|\/)/, // Root
      },
      {
        key: 'SUNDUK',
        name: 'SUNDUK',
        query: /SUNDUK/,
        location: /(\\|\/)/, // Root
      },
    ],
    folderDoesntExist: [{ key: 'lib', name: 'lib', query: /lib/ }],
  },
  ['index.php']: {
    query: /^(\\|\/)index\.php/,
    lineExists: [
      { key: 'domonet', name: 'подключения domonet.js', query: /domonet\.js/ },
      {
        key: 'buttonSend',
        name: 'скрипта интеграции',
        query: /function buttonSend\(formId\) {/,
      },
      {
        key: 'lfx',
        name: 'Facebook метрики в скрипте',
        query: /document\.querySelectorAll\(('|")input\[name=lfx\]('|")\)/,
      },
      {
        key: 'gtm',
        name: 'Google метрики в скрипте',
        query: /document\.querySelectorAll\(('|")input\[name=gt\]('|")\)/,
      },
      {
        key: 'yam',
        name: 'Yandex метрики в скрипте',
        query: /document\.querySelectorAll\(('|")input\[name=yam\]('|")\)/,
      },
    ],
    lineDoesntExist: [
      {
        key: 'price',
        name: 'price.js',
        query: /price\.js/,
      },
      {
        key: 'style',
        name: '<style>',
        query: /<style>/,
      },
    ],
    linesEquality: [
      {
        key: 'formId',
        name: 'Соответствие formId у формы и атрибута в скрипте',
        firstLine: /<form/,
        firstExtractor: (line) =>
          line
            .match(/id=('|")\S+('|")/)[0]
            .replace(/id=/, '')
            .replace(/('|")/g, ''),
        secondLine: /buttonSend\(('|")#/,
        secondExtractor: (line) =>
          line
            .match(/('|")\S+('|")/)[0]
            .replace(/('|")/g, '')
            .replace('#', ''),
      },
      {
        key: 'geo',
        name: 'Соответствие гео и языка в скрипте',
        firstValue: 'geo',
        secondLine: /asda/,
        secondExtractor: (line) => line,
      },
    ],
    lineCorrectness: [
      {
        key: 'fontFamily',
        name: 'Все font-family - sans-serif или inherit',
        lineQuery: /font-family/,
        targetQuery: /font-family:\s?((sans-serif)|(inherit))/,
      },
    ],
  },
  ['SUNDUK\\index.php']: {
    query: /^(\\|\/)SUNDUK(\\|\/)index\.php/,
    lineExists: [
      { key: 'domonet', name: 'подключения domonet.js', query: /domonet\.js/ },
      {
        key: 'buttonSend',
        name: 'скрипта интеграции',
        query: /function buttonSend\(formId\) {/,
      },
      {
        key: 'lfx',
        name: 'Facebook метрики в скрипте',
        query: /document\.querySelectorAll\(('|")input\[name=lfx\]('|")\)/,
      },
      {
        key: 'gtm',
        name: 'Google метрики в скрипте',
        query: /document\.querySelectorAll\(('|")input\[name=gt\]('|")\)/,
      },
      {
        key: 'yam',
        name: 'Yandex метрики в скрипте',
        query: /document\.querySelectorAll\(('|")input\[name=yam\]('|")\)/,
      },
    ],
    lineDoesntExist: [
      {
        key: 'price',
        name: 'price.js',
        query: /price\.js/,
      },
      {
        key: 'style',
        name: '<style>',
        query: /<style>/,
      },
    ],
    linesEquality: [
      {
        key: 'formId',
        name: 'Соответствие formId у формы и атрибута в скрипте',
        firstLine: /<form/,
        firstExtractor: (line) =>
          line
            .match(/id=('|")\S+('|")/)[0]
            .replace(/id=/, '')
            .replace(/('|")/g, ''),
        secondLine: /buttonSend\(('|")#/,
        secondExtractor: (line) =>
          line
            .match(/('|")\S+('|")/)[0]
            .replace(/('|")/g, '')
            .replace('#', ''),
      },
      {
        key: 'geo',
        name: 'Соответствие гео и языка в скрипте',
        firstValue: 'geo',
        secondLine: /asda/,
        secondExtractor: (line) => line,
      },
    ],
    lineCorrectness: [
      {
        key: 'fontFamily',
        name: 'Все font-family - sans-serif или inherit',
        lineQuery: /font-family/,
        targetQuery: /font-family:\s?((sans-serif)|(inherit))/,
      },
    ],
  },
  ['CSS']: {
    query: /\.css$/,
    lineExists: [],
    lineDoesntExist: [],
    linesEquality: [],
    lineCorrectness: [
      {
        key: 'fontFamily',
        name: 'Все font-family - sans-serif или inherit',
        lineQuery: /font-family/,
        targetQuery: /font-family:\s?((sans-serif)|(inherit))/,
      },
    ],
  },
};

const result = {
  common: {},
  reset: () => {
    Object.entries(rules).forEach(([key]) => {
      result[key] = {};
      Object.values(rules[key]).forEach((checks) => {
        Object.values(checks).forEach((check) => {
          result[key][check.key] = {};
        });
      });
    });
  },
};

result.reset();

module.exports = { rules, result };
