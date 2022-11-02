const isExists = [
  // index.php
  async (path, stats) => {
    return {
      key: 'index',
      status: !!path.replace(global.folder, '').match(/^\\index.php/),
    };
  },
  // favicon
  async (path, stats) => {
    return {
      key: 'favicon',
      status: !!path.replace(global.folder, '').match(/^\\favicon.ico/),
    };
  },
  // confirm
  async (path, stats) => {
    return {
      key: 'confirm',
      status: !!path.replace(global.folder, '').match(/^\\confirm/),
    };
  },
  // SUNDUK
  async (path, stats) => {
    return {
      key: 'sunduk',
      status: !!path.replace(global.folder, '').match(/^\\SUNDUK/),
    };
  },
  // domonet.js
  async (path, stats) => {
    return {
      key: 'domonet',
      status: !!path.replace(global.folder, '').match(/^\\js\\domonet.js/),
    };
  },
  // sunduk domonet
  async (path, stats) => {
    return {
      key: 'sundukDomonet',
      status: !!path
        .replace(global.folder, '')
        .match(/^\\SUNDUK\\js\\domonet.js/),
    };
  },
  // lib
  async (path, stats) => {
    return {
      key: 'lib',
      status: !!path.replace(global.folder, '').match(/^\\lib/),
    };
  },
];

const indexPhpChecks = [
  // price.js
  (line) => {
    if (line.match(/price.js/)) return { key: 'price', content: line.trim() };
  },
  // https
  (line) => {
    if (line.match()) return;
  },
  // style tag
  (line) => {
    if (line.match(/<style>/)) return { key: 'style', content: line.trim() };
  },
  // font-family
  (line) => {
    if (
      line.match(/font-family/) &&
      !line.match(/font-family:\s?sans-serif/) &&
      !line.match(/font-family:\s?inherit/)
    )
      return { key: 'fontFamily', content: line.trim() };
  },
  // domonet
  (line) => {
    if (line.match(/<script (\s+)?src=('|")js\/domonet.js('|")(.+)?>/))
      return { key: 'domonet', status: true };
  },
  // buttonSend
  (line) => {
    if (line.match(/function buttonSend\(formId\) {/))
      return { key: 'buttonSend', status: true };
  },
  // formId
  (line) => {
    if (line.match(/<form/)) {
      const id = line
        .match(/id=('|")\S+('|")/)[0]
        .replace(/id=/, '')
        .replace(/('|")/g, '');

      global.formId = id;
    }
    if (line.match(/buttonSend\(('|")#/)) {
      const id = line
        .match(/('|")\S+('|")/)[0]
        .replace(/('|")/g, '')
        .replace('#', '');
      if (id === global.formId) return { key: 'formId', status: true };
    }
  },
  // lang
  // lfx
  (line) => {
    if (line.match(/document.querySelectorAll\("input\[name=lfx]"\)/))
      return { key: 'lfx', status: true };
  },
  // gtm
  (line) => {
    if (line.match(/document\.querySelectorAll\('input\[name=gt\]'\)/))
      return { key: 'gtm', status: true };
  },
  // yam
  (line) => {
    if (line.match(/document\.querySelectorAll\('input\[name=yam\]'\)/))
      return { key: 'yam', status: true };
  },
  // input attributes
  (line) => {
    if (line.match(/<input/) && line.match(/type=('|")text('|")/))
      if (!line.match(/required/) || !line.match(/minlength=('|")2('|")/))
        return { key: 'inputs', content: line.trim() };
    if (line.match(/<input/) && line.match(/type=('|")tel('|")/))
      if (
        !line.match(/required/) ||
        !line.match(/minlength=('|")8('|")/) ||
        !line.match(/maxlength=('|")18('|")/)
      )
        return { key: 'inputs', content: line.trim() };
  },
  // anchors
  (line) => {
    if (line.match(/<a/) && !line.match(/#goToForm/))
      return { key: 'anchors', content: line.trim() };
  },
];

const sundukInputPhpChecks = [
  // price.js
  (line) => {
    if (line.match(/price.js/)) return { key: 'price', content: line.trim() };
  },
  // https
  (line) => {
    if (line.match()) return;
  },
  // style tag
  (line) => {
    if (line.match(/<style>/)) return { key: 'style', content: line.trim() };
  },
  // font-family
  (line) => {
    if (
      line.match(/font-family/) &&
      !line.match(/font-family:\s?sans-serif/) &&
      !line.match(/font-family:\s?inherit/)
    )
      return { key: 'fontFamily', content: line.trim() };
  },
  // domonet
  (line) => {
    if (line.match(/<script (\s+)?src=('|")js\/domonet.js('|")(.+)?>/))
      return { key: 'domonet', status: true };
  },
  // buttonSend
  (line) => {
    if (line.match(/function buttonSend\(formId\) {/))
      return { key: 'buttonSend', status: true };
  },
  // formId
  (line) => {
    if (line.match(/<form/)) {
      const id = line
        .match(/id=('|")\S+('|")/)[0]
        .replace(/id=/, '')
        .replace(/('|")/g, '');

      global.formId = id;
    }
    if (line.match(/buttonSend\(('|")#/)) {
      const id = line
        .match(/('|")\S+('|")/)[0]
        .replace(/('|")/g, '')
        .replace('#', '');
      if (id === global.formId) return { key: 'formId', status: true };
    }
  },
  // lang
  // lfx
  (line) => {
    if (line.match(/document.querySelectorAll\("input\[name=lfx]"\)/))
      return { key: 'lfx', status: true };
  },
  // gtm
  (line) => {
    if (line.match(/document\.querySelectorAll\('input\[name=gt\]'\)/))
      return { key: 'gtm', status: true };
  },
  // yam
  (line) => {
    if (line.match(/document\.querySelectorAll\('input\[name=yam\]'\)/))
      return { key: 'yam', status: true };
  },
  // input attributes
  (line) => {
    if (line.match(/<input/) && line.match(/type=('|")text('|")/))
      if (!line.match(/required/) || !line.match(/minlength=('|")2('|")/))
        return { key: 'inputs', content: line.trim() };
    if (line.match(/<input/) && line.match(/type=('|")tel('|")/))
      if (
        !line.match(/required/) ||
        !line.match(/minlength=('|")8('|")/) ||
        !line.match(/maxlength=('|")18('|")/)
      )
        return { key: 'inputs', content: line.trim() };
  },
];

const cssChecks = [
  // font-family
  (line) => {
    if (
      line.match(/font-family/) &&
      !line.match(/font-family:\s?sans-serif/) &&
      !line.match(/font-family:\s?inherit/)
    )
      return { key: 'fontFamily', content: line.trim() };
  },
  // font-face
  (line) => {
    if (line.match(/font-face/))
      return { key: 'fontFace', content: line.trim() };
  },
];

module.exports = { isExists, indexPhpChecks, sundukInputPhpChecks, cssChecks };
