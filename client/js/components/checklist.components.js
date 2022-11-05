const checkList = document.querySelector('.checklist');

const checkListGroup = document.createElement('div');
checkListGroup.classList.add('checklist__group');

const checkListGroupName = document.createElement('div');
checkListGroupName.classList.add('checklist__group-name');

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

export {
  checkList,
  checkListGroup,
  checkListGroupName,
  checkListItem,
  checkListDropdown,
  checkListSpoiler,
};
