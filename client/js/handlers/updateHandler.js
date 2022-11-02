import dropdownHandler from './dropdownsHandler.js';

const { socket } = window;

const overall = document.querySelector('#overall');
const index_php = document.querySelector('#index_php');
const sunduk_index_php = document.querySelector('#sunduk_index_php');
const css = document.querySelector('#css');

const checkListItem = document.createElement('div');
checkListItem.classList.add('checklist__item');

const checkListStatus = document.createElement('div');
checkListStatus.classList.add('checklist__item-status');
checkListItem.appendChild(checkListStatus);

const checkListText = document.createElement('div');
checkListText.classList.add('checklist__item-text');
checkListItem.appendChild(checkListText);

const checkListDropdown = document.createElement('div');
checkListDropdown.classList.add('checklist__item-dropdown');

const checkListSpoiler = document.createElement('div');
checkListSpoiler.classList.add('checklist__spoiler');
checkListSpoiler.appendChild(document.createElement('ul'));

const statuses = {
  check: '✔️',
  warrning: '⚠️',
  error: '❌',
};

socket.on('update', (rules) => {
  overall.innerHTML = '';
  index_php.innerHTML = '';
  sunduk_index_php.innerHTML = '';
  css.innerHTML = '';

  overallHanlder(rules.overall, overall);
  indexHandler(rules.index, index_php);
  sundukIndexHandler(rules.sundukIndex, sunduk_index_php);
  cssHandler(rules.css, css);
});

const overallHanlder = (rules, parent) => {
  Object.entries(rules).forEach((rule) => {
    const item = checkListItem.cloneNode(true);
    parent.appendChild(item);

    switch (rule[0]) {
      case 'index':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Наличие index.php`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'favicon':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Наличие favicon`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'confirm':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Наличие confirm`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'sunduk':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Наличие SUNDUK`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'domonet':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Наличие domonet.js`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'sundukDomonet':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Наличие domonet.js в сундуке`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'lib':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Отсутствие папки lib`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.error
          : statuses.check;
        break;
    }
  });
};

const indexHandler = (rules, parent) => {
  Object.entries(rules).forEach((rule) => {
    const item = checkListItem.cloneNode(true);
    parent.appendChild(item);

    switch (rule[0]) {
      case 'price':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Отсутствие price.js`;
        item.querySelector('.checklist__item-status').innerHTML =
          rule[1].length === 0 ? statuses.check : statuses.error;

        if (rule[1].length !== 0) {
          const spoiler = parent.appendChild(checkListSpoiler.cloneNode(true));
          spoiler.dataset.name =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');

          const dropdown = checkListDropdown.cloneNode(true);
          dropdown.innerText = rule[1].length;
          dropdown.dataset.spoiler =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');
          dropdown.onclick = dropdownHandler;
          item.appendChild(dropdown);

          rule[1].forEach((error) => {
            const li = document.createElement('li');
            li.innerText = `"${error.content}" `;
            li.innerHTML += `<span class="file">${error.file}</span>:<span class="line">${error.line}</span>`;
            spoiler.querySelector('ul').appendChild(li);
          });
        }

        break;
      case 'https':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Отсутствие сторонних http`;
        item.querySelector('.checklist__item-status').innerHTML =
          rule[1].length === 0 ? statuses.check : statuses.error;

        if (rule[1].length !== 0) {
          const spoiler = parent.appendChild(checkListSpoiler.cloneNode(true));
          spoiler.dataset.name =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');

          const dropdown = checkListDropdown.cloneNode(true);
          dropdown.innerText = rule[1].length;
          dropdown.dataset.spoiler =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');
          dropdown.onclick = dropdownHandler;
          item.appendChild(dropdown);

          rule[1].forEach((error) => {
            const li = document.createElement('li');
            li.innerText = `"${error.content}" `;
            li.innerHTML += `<span class="file">${error.file}</span>:<span class="line">${error.line}</span>`;
            spoiler.querySelector('ul').appendChild(li);
          });
        }

        break;
      case 'style':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Отсутствие &lt;style&gt;`;
        item.querySelector('.checklist__item-status').innerHTML =
          rule[1].length === 0 ? statuses.check : statuses.error;

        if (rule[1].length !== 0) {
          const spoiler = parent.appendChild(checkListSpoiler.cloneNode(true));
          spoiler.dataset.name =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');

          const dropdown = checkListDropdown.cloneNode(true);
          dropdown.innerText = rule[1].length;
          dropdown.dataset.spoiler =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');
          dropdown.onclick = dropdownHandler;
          item.appendChild(dropdown);

          rule[1].forEach((error) => {
            const li = document.createElement('li');
            li.innerText = `"${error.content}" `;
            li.innerHTML += `<span class="file">${error.file}</span>:<span class="line">${error.line}</span>`;
            spoiler.querySelector('ul').appendChild(li);
          });
        }

        break;
      case 'fontFamily':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Все font-family - sans-serif`;
        item.querySelector('.checklist__item-status').innerHTML =
          rule[1].length === 0 ? statuses.check : statuses.error;

        if (rule[1].length !== 0) {
          const spoiler = parent.appendChild(checkListSpoiler.cloneNode(true));
          spoiler.dataset.name =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');

          const dropdown = checkListDropdown.cloneNode(true);
          dropdown.innerText = rule[1].length;
          dropdown.dataset.spoiler =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');
          dropdown.onclick = dropdownHandler;
          item.appendChild(dropdown);

          rule[1].forEach((error) => {
            const li = document.createElement('li');
            li.innerText = `"${error.content}" `;
            li.innerHTML += `<span class="file">${error.file}</span>:<span class="line">${error.line}</span>`;
            spoiler.querySelector('ul').appendChild(li);
          });
        }

        break;
      case 'domonet':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `domonet.js подключен`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'buttonSend':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Наличие скрипта интеграции`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'formId':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Id формы соответствует id в скрипте`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'lang':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Язык в скрипте соответствует`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'lfx':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Facebook интегрирован в скрипт`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'gtm':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Google Pixel интегрирован в скрипт`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'yam':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `ЯМетрика интегрирована в скрипт`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'inputs':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Аттрибуты input указаны верно`;
        item.querySelector('.checklist__item-status').innerHTML =
          rule[1].length === 0 ? statuses.check : statuses.error;

        if (rule[1].length !== 0) {
          const spoiler = parent.appendChild(checkListSpoiler.cloneNode(true));
          spoiler.dataset.name =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');

          const dropdown = checkListDropdown.cloneNode(true);
          dropdown.innerText = rule[1].length;
          dropdown.dataset.spoiler =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');
          dropdown.onclick = dropdownHandler;
          item.appendChild(dropdown);

          rule[1].forEach((error) => {
            const li = document.createElement('li');
            li.innerText = `"${error.content}" `;
            li.innerHTML += `<span class="file">${error.file}</span>:<span class="line">${error.line}</span>`;
            spoiler.querySelector('ul').appendChild(li);
          });
        }

        break;
      case 'anchors':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Ссылки ссылаются на #goToForm`;
        item.querySelector('.checklist__item-status').innerHTML =
          rule[1].length === 0 ? statuses.check : statuses.error;

        if (rule[1].length !== 0) {
          const spoiler = parent.appendChild(checkListSpoiler.cloneNode(true));
          spoiler.dataset.name =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');

          const dropdown = checkListDropdown.cloneNode(true);
          dropdown.innerText = rule[1].length;
          dropdown.dataset.spoiler =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');
          dropdown.onclick = dropdownHandler;
          item.appendChild(dropdown);

          rule[1].forEach((error) => {
            const li = document.createElement('li');
            li.innerText = `"${error.content}" `;
            li.innerHTML += `<span class="file">${error.file}</span>:<span class="line">${error.line}</span>`;
            spoiler.querySelector('ul').appendChild(li);
          });
        }

        break;
    }
  });
};

const sundukIndexHandler = (rules, parent) => {
  Object.entries(rules).forEach((rule) => {
    const item = checkListItem.cloneNode(true);
    parent.appendChild(item);

    switch (rule[0]) {
      case 'price':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Отсутствие price.js`;
        item.querySelector('.checklist__item-status').innerHTML =
          rule[1].length === 0 ? statuses.check : statuses.error;

        if (rule[1].length !== 0) {
          const spoiler = parent.appendChild(checkListSpoiler.cloneNode(true));
          spoiler.dataset.name =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');

          const dropdown = checkListDropdown.cloneNode(true);
          dropdown.innerText = rule[1].length;
          dropdown.dataset.spoiler =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');
          dropdown.onclick = dropdownHandler;
          item.appendChild(dropdown);

          rule[1].forEach((error) => {
            const li = document.createElement('li');
            li.innerText = `"${error.content}" `;
            li.innerHTML += `<span class="file">${error.file}</span>:<span class="line">${error.line}</span>`;
            spoiler.querySelector('ul').appendChild(li);
          });
        }

        break;
      case 'https':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Отсутствие сторонних http`;
        item.querySelector('.checklist__item-status').innerHTML =
          rule[1].length === 0 ? statuses.check : statuses.error;

        if (rule[1].length !== 0) {
          const spoiler = parent.appendChild(checkListSpoiler.cloneNode(true));
          spoiler.dataset.name =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');

          const dropdown = checkListDropdown.cloneNode(true);
          dropdown.innerText = rule[1].length;
          dropdown.dataset.spoiler =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');
          dropdown.onclick = dropdownHandler;
          item.appendChild(dropdown);

          rule[1].forEach((error) => {
            const li = document.createElement('li');
            li.innerText = `"${error.content}" `;
            li.innerHTML += `<span class="file">${error.file}</span>:<span class="line">${error.line}</span>`;
            spoiler.querySelector('ul').appendChild(li);
          });
        }

        break;
      case 'style':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Отсутствие &lt;style&gt;`;
        item.querySelector('.checklist__item-status').innerHTML =
          rule[1].length === 0 ? statuses.check : statuses.error;

        if (rule[1].length !== 0) {
          const spoiler = parent.appendChild(checkListSpoiler.cloneNode(true));
          spoiler.dataset.name =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');

          const dropdown = checkListDropdown.cloneNode(true);
          dropdown.innerText = rule[1].length;
          dropdown.dataset.spoiler =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');
          dropdown.onclick = dropdownHandler;
          item.appendChild(dropdown);

          rule[1].forEach((error) => {
            const li = document.createElement('li');
            li.innerText = `"${error.content}" `;
            li.innerHTML += `<span class="file">${error.file}</span>:<span class="line">${error.line}</span>`;
            spoiler.querySelector('ul').appendChild(li);
          });
        }

        break;
      case 'fontFamily':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Все font-family - sans-serif`;
        item.querySelector('.checklist__item-status').innerHTML =
          rule[1].length === 0 ? statuses.check : statuses.error;

        if (rule[1].length !== 0) {
          const spoiler = parent.appendChild(checkListSpoiler.cloneNode(true));
          spoiler.dataset.name =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');

          const dropdown = checkListDropdown.cloneNode(true);
          dropdown.innerText = rule[1].length;
          dropdown.dataset.spoiler =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');
          dropdown.onclick = dropdownHandler;
          item.appendChild(dropdown);

          rule[1].forEach((error) => {
            const li = document.createElement('li');
            li.innerText = `"${error.content}" `;
            li.innerHTML += `<span class="file">${error.file}</span>:<span class="line">${error.line}</span>`;
            spoiler.querySelector('ul').appendChild(li);
          });
        }

        break;
      case 'domonet':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `domonet.js подключен`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'buttonSend':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Наличие скрипта интеграции`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'formId':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Id формы соответствует id в скрипте`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'lang':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Язык в скрипте соответствует`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'lfx':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Facebook интегрирован в скрипт`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'gtm':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Google Pixel интегрирован в скрипт`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'yam':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `ЯМетрика интегрирована в скрипт`;
        item.querySelector('.checklist__item-status').innerHTML = rule[1]
          ? statuses.check
          : statuses.error;
        break;
      case 'inputs':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Аттрибуты input указаны верно`;
        item.querySelector('.checklist__item-status').innerHTML =
          rule[1].length === 0 ? statuses.check : statuses.error;

        if (rule[1].length !== 0) {
          const spoiler = parent.appendChild(checkListSpoiler.cloneNode(true));
          spoiler.dataset.name =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');

          const dropdown = checkListDropdown.cloneNode(true);
          dropdown.innerText = rule[1].length;
          dropdown.dataset.spoiler =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');
          dropdown.onclick = dropdownHandler;
          item.appendChild(dropdown);

          rule[1].forEach((error) => {
            const li = document.createElement('li');
            li.innerText = `"${error.content}" `;
            li.innerHTML += `<span class="file">${error.file}</span>:<span class="line">${error.line}</span>`;
            spoiler.querySelector('ul').appendChild(li);
          });
        }

        break;
    }
  });
};

const cssHandler = (rules, parent) => {
  Object.entries(rules).forEach((rule) => {
    const item = checkListItem.cloneNode(true);
    parent.appendChild(item);

    switch (rule[0]) {
      case 'fontFamily':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Все font-family - sans-serif`;
        item.querySelector('.checklist__item-status').innerHTML =
          rule[1].length === 0 ? statuses.check : statuses.error;

        if (rule[1].length !== 0) {
          const spoiler = parent.appendChild(checkListSpoiler.cloneNode(true));
          spoiler.dataset.name =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');

          const dropdown = checkListDropdown.cloneNode(true);
          dropdown.innerText = rule[1].length;
          dropdown.dataset.spoiler =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');
          dropdown.onclick = dropdownHandler;
          item.appendChild(dropdown);

          rule[1].forEach((error) => {
            const li = document.createElement('li');
            li.innerText = `"${error.content}" `;
            li.innerHTML += `<span class="file">${error.file}</span>:<span class="line">${error.line}</span>`;
            spoiler.querySelector('ul').appendChild(li);
          });
        }

        break;
      case 'fontFace':
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Отсутствие font-face`;
        item.querySelector('.checklist__item-status').innerHTML =
          rule[1].length === 0 ? statuses.check : statuses.error;

        if (rule[1].length !== 0) {
          const spoiler = parent.appendChild(checkListSpoiler.cloneNode(true));
          spoiler.dataset.name =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');

          const dropdown = checkListDropdown.cloneNode(true);
          dropdown.innerText = rule[1].length;
          dropdown.dataset.spoiler =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');
          dropdown.onclick = dropdownHandler;
          item.appendChild(dropdown);

          rule[1].forEach((error) => {
            const li = document.createElement('li');
            li.innerText = `"${error.content}" `;
            li.innerHTML += `<span class="file">${error.file}</span>:<span class="line">${error.line}</span>`;
            spoiler.querySelector('ul').appendChild(li);
          });
        }

        break;
        item.querySelector(
          '.checklist__item-text'
        ).innerHTML = `Аттрибуты input указаны верно`;
        item.querySelector('.checklist__item-status').innerHTML =
          rule[1].length === 0 ? statuses.check : statuses.error;

        if (rule[1].length !== 0) {
          const spoiler = parent.appendChild(checkListSpoiler.cloneNode(true));
          spoiler.dataset.name =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');

          const dropdown = checkListDropdown.cloneNode(true);
          dropdown.innerText = rule[1].length;
          dropdown.dataset.spoiler =
            rule[0] + rule[1][0].file.replace(/[\\|\/]/, '');
          dropdown.onclick = dropdownHandler;
          item.appendChild(dropdown);

          rule[1].forEach((error) => {
            const li = document.createElement('li');
            li.innerText = `"${error.content}" `;
            li.innerHTML += `<span class="file">${error.file}</span>:<span class="line">${error.line}</span>`;
            spoiler.querySelector('ul').appendChild(li);
          });
        }

        break;
    }
  });
};
