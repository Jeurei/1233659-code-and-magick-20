'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var QUANTITY_OF_WIZARDS = 4;
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;
var ESC_CODE = 'Escape';
var ENTER_CODE = 'Enter';
var userSetup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var simillarSetup = document.querySelector('.setup-similar');
var simillarList = userSetup.querySelector('.setup-similar-list');
var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var userName = document.querySelector('.setup-user-name');
var setupSubmit = document.querySelector('.setup-submit');
var coatColor = userSetup.querySelector('.coat-color');
var eyesColor = userSetup.querySelector('.eyes-color');
var fireballColor = userSetup.querySelector('.fireball-color');
var userCoat = userSetup.querySelector('.wizard-coat');
var userEyes = userSetup.querySelector('.wizard-eyes');
var userFireball = userSetup.querySelector('.setup-fireball-wrap');
var sliderCounter = 1;

function getRandomInRange(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

var onSetupEscPress = function (evt) {

  if (evt.key === ESC_CODE && document.activeElement !== userName) {
    evt.preventDefault();
    closeSetup();
  }

};

var onSetupEnterPress = function (evt) {

  if (evt.key === ENTER_CODE) {
    userSetup.classList.add('hidden');
    userSetup.submit();
  }

};

var onSubmitSetup = function () {
  userSetup.classList.add('hidden');
  userSetup.submit();
  setupSubmit.removeEventListener('click', onSubmitSetup);
};

var checkInvalidUserName = function () {

  if (userName.validity.valueMissing) {
    userName.setCustomValidity('Обязательное поле');
    setupSubmit.setAttribute('disabled', true);
  } else {
    userName.setCustomValidity('');
    setupSubmit.setAttribute('disabled', false);
  }

};

var checkInvalidInput = function () {
  var valueLength = userName.value.length;

  if (valueLength < MIN_NAME_LENGTH) {
    userName.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
    setupSubmit.setAttribute('disabled', true);
  } else if (valueLength > MAX_NAME_LENGTH) {
    userName.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
    setupSubmit.setAttribute('disabled', true);
  } else {
    userName.setCustomValidity('');
    setupSubmit.setAttribute('disabled', false);
  }

};

var changeCoat = function () {
  var current = sliderCounter % COAT_COLORS.length;
  userCoat.style.fill = COAT_COLORS[current];
  coatColor.value = COAT_COLORS[current];
  sliderCounter++;
};

var changeEyes = function () {
  var current = sliderCounter % EYES_COLORS.length;
  userEyes.style.fill = EYES_COLORS[current];
  eyesColor.value = EYES_COLORS[current];
  sliderCounter++;
};

var changeFireball = function () {
  var current = sliderCounter % FIREBALL_COLORS.length;
  userFireball.style.backgroundColor = FIREBALL_COLORS[current];
  fireballColor.value = FIREBALL_COLORS[current];
  sliderCounter++;
};

var openSetup = function () {
  userSetup.classList.remove('hidden');

  document.addEventListener('keydown', onSetupEscPress);

  setupSubmit.addEventListener('click', onSubmitSetup);

  setupSubmit.addEventListener('keydown', onSetupEnterPress);

  userName.addEventListener('invalid', checkInvalidUserName);

  userName.addEventListener('input', checkInvalidInput);

  userCoat.addEventListener('click', changeCoat);

  userEyes.addEventListener('click', changeEyes);

  userFireball.addEventListener('click', changeFireball);

  setupClose.addEventListener('click', closeSetup);

  setupOpen.removeEventListener('click', openSetup);
};

var closeSetup = function () {
  userSetup.classList.add('hidden');

  document.removeEventListener('keydown', onSetupEscPress);

  setupSubmit.removeEventListener('click', onSubmitSetup);

  setupSubmit.removeEventListener('keydown', onSetupEnterPress);

  userName.removeEventListener('invalid', checkInvalidUserName);

  userName.removeEventListener('input', checkInvalidInput);

  userCoat.removeEventListener('click', changeCoat);

  userEyes.removeEventListener('click', changeEyes);

  userFireball.removeEventListener('click', changeFireball);

  setupOpen.addEventListener('click', openSetup);

  setupClose.removeEventListener('click', closeSetup);

};


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
    name: WIZARD_NAMES[getRandomInRange(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[getRandomInRange(0, WIZARD_SURNAMES.length)],
    coatColor: COAT_COLORS[getRandomInRange(0, COAT_COLORS.length - 1)],
    eyesColor: EYES_COLORS[getRandomInRange(0, EYES_COLORS.length - 1)]
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

  if (setupOpen) {
    setupOpen.addEventListener('click', openSetup);
    setupOpen.addEventListener('keydown', function (evt) {
      if (evt.key === 'Enter') {
        openSetup();
      }
    });

    setupClose.addEventListener('keydown', function (evt) {

      if (evt.key === 'Enter') {
        closeSetup();
      }
    });

  }
}
