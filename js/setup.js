'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLOR = ['black', 'red', 'blue', 'yellow', 'green'];
var QUANTITY_OF_WIZARDS = 4;
var userSetup = document.querySelector('.setup');
var simillarSetup = document.querySelector('.setup-similar');
var simillarList = userSetup.querySelector('.setup-similar-list');
var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

function getRandomInRange(max, min) {
  return min === undefined ? Math.floor(Math.random() * max) : Math.floor(min + Math.random() * (max + 1 - min));
}

function renderWizards(arr) {
  var fragment = document.createDocumentFragment();
  arr.forEach(function (el) {
    var wizardEl = template.cloneNode(true);
    wizardEl.querySelector('.setup-similar-label').textContent = el.name;
    wizardEl.querySelector('.wizard-coat').style.fill = el.coatColor;
    wizardEl.querySelector('.wizard-eyes').style.fill = el.eyesColor;
    fragment.appendChild(wizardEl);
  });
  return fragment;
}

function createWizardObj() {
  return {
    name: WIZARD_NAMES[getRandomInRange(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandomInRange(WIZARD_SURNAMES.length)],
    coatColor: COAT_COLORS[getRandomInRange(COAT_COLORS.length)],
    eyesColor: EYES_COLOR[getRandomInRange(EYES_COLOR.length)]
  };
}

function createWizards() {
  var arr = [];
  for (var i = 0; i < QUANTITY_OF_WIZARDS; i++) {
    arr.push(createWizardObj());
  }
  return arr;
}

function appendWizards() {
  simillarList.appendChild(renderWizards(createWizards()));
  simillarSetup.classList.remove('hidden');
}

if (userSetup) {
  appendWizards();
  userSetup.classList.remove('hidden');
}
