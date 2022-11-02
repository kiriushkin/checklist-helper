export default (e) => {
  const spoiler = document.querySelector(
    `[data-name="${e.target.dataset.spoiler}"]`
  );
  spoiler.classList.contains('checklist__spoiler_shown')
    ? spoiler.classList.remove('checklist__spoiler_shown')
    : spoiler.classList.add('checklist__spoiler_shown');

  e.target.classList.contains('checklist__item-dropdown_opened')
    ? e.target.classList.remove('checklist__item-dropdown_opened')
    : e.target.classList.add('checklist__item-dropdown_opened');
};
