'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var QUANTITY_OF_WIZARDS = 4;
var MIN_NAME_LENGTH = 2;
var MAX_NAME_LENGTH = 25;
var userSetup = document.querySelector('.setup');
var setupOpen = document.querySelector('.setup-open');
var setupClose = document.querySelector('.setup-close');
var simillarSetup = document.querySelector('.setup-similar');
var simillarList = userSetup.querySelector('.setup-similar-list');
var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var userName = document.querySelector('.setup-user-name');
var setupSubmit = document.querySelector('.setup-submit');

function getRandomInRange(min, max) {
  return Math.floor(min + Math.random() * (max + 1 - min));
}

var submitSetup = function () {
  userSetup.classList.add('hidden');
  userSetup.submit();
  setupSubmit.removeEventListener('click', submitSetup);
};

var openSetup = function () {
  var coatCounter = 1;
  var eyesCounter = 1;
  var fireballCounter = 1;
  var coatColor = userSetup.querySelector('.coat-color');
  var eyesColor = userSetup.querySelector('.eyes-color');
  var fireballColor = userSetup.querySelector('.fireball-color');
  userSetup.classList.remove('hidden');
  document.addEventListener('keydown', onSetupEscPress);
  setupSubmit.addEventListener('click', submitSetup);

  setupSubmit.addEventListener('keydown', function (evt) {

    if (evt.key === 'Enter') {
      userSetup.classList.add('hidden');
      userSetup.submit();
    }

  });

  userName.addEventListener('invalid', function () {

    if (userName.validity.valueMissing) {
      userName.setCustomValidity('Обязательное поле');
      setupSubmit.disabled = true;
    } else {
      userName.setCustomValidity('');
      setupSubmit.disabled = false;
    }

  });

  userName.addEventListener('input', function () {
    var valueLength = userName.value.length;

    if (valueLength < MIN_NAME_LENGTH) {
      userName.setCustomValidity('Ещё ' + (MIN_NAME_LENGTH - valueLength) + ' симв.');
      setupSubmit.disabled = true;
    } else if (valueLength > MAX_NAME_LENGTH) {
      userName.setCustomValidity('Удалите лишние ' + (valueLength - MAX_NAME_LENGTH) + ' симв.');
      setupSubmit.disabled = true;
    } else {
      userName.setCustomValidity('');
      setupSubmit.disabled = false;
    }

  });
  userSetup.addEventListener('click', function (evt) {

    if (evt.target.classList.contains('wizard-coat')) {

      if (coatCounter === COAT_COLORS.length) {
        coatCounter = 0;
      }

      evt.target.style = 'fill:' + COAT_COLORS[coatCounter];
      coatColor.value = COAT_COLORS[coatCounter];
      coatCounter++;
    }

    if (evt.target.classList.contains('wizard-eyes')) {

      if (eyesCounter === EYES_COLORS.length) {
        eyesCounter = 0;
      }

      evt.target.style = 'fill:' + EYES_COLORS[eyesCounter];
      eyesColor.value = EYES_COLORS[eyesCounter];
      eyesCounter++;
    }

    if (evt.target.classList.contains('setup-fireball')) {

      if (fireballCounter === FIREBALL_COLORS.length) {
        fireballCounter = 0;
      }

      evt.target.parentNode.style = 'background-color:' + FIREBALL_COLORS[fireballCounter];
      fireballColor.value = FIREBALL_COLORS[fireballCounter];
      fireballCounter++;
    }

  });
  setupClose.addEventListener('click', closeSetup);
  setupOpen.removeEventListener('click', openSetup);
};

var closeSetup = function () {
  userSetup.classList.add('hidden');
  document.removeEventListener('keydown', onSetupEscPress);
  setupOpen.addEventListener('click', openSetup);
  setupClose.removeEventListener('click', closeSetup);
};

var onSetupEscPress = function (evt) {

  if (evt.key === 'Escape' && document.activeElement !== userName) {
    evt.preventDefault();
    closeSetup();
  }

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
