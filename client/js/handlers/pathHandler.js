const { socket } = window;

const label = document.querySelector('label[for="path"]');
const pathText = document.querySelector('.setup__path');

let path;

label.addEventListener('click', async (e) => {
  e.preventDefault();
  path = await window.api.selectFolder();
  console.log(path);
  pathText.innerHTML =
    '...' +
    path.match(
      /(\\|\/)[\w|\.|\-|\s]+(\\|\/)[\w|\.|\-|\s]+(\\|\/)[\w|\.|\-|\s]+$/
    )[0];
  document.title =
    'Чек-лист - ' +
    path.match(/(\\|\/)[\w|\.|\-|\s]+$/)[0].replace(/[\\|/]/, '');

  socket.emit('watching', path);
});

export { path };
