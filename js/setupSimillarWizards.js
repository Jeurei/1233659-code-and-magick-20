'use strict';
window.setupSimillarWizards = (function () {
  var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
  var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
  var QUANTITY_OF_WIZARDS = 4;
  var simillarSetup = document.querySelector('.setup-similar');
  var simillarList = window.util.userSetup.querySelector('.setup-similar-list');
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
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
      name: WIZARD_NAMES[window.util.getRandomInRange(0, WIZARD_NAMES.length - 1)] + ' ' + WIZARD_SURNAMES[window.util.getRandomInRange(0, WIZARD_SURNAMES.length)],
      coatColor: window.util.COAT_COLORS[window.util.getRandomInRange(0, window.util.COAT_COLORS.length - 1)],
      eyesColor: window.util.EYES_COLORS[window.util.getRandomInRange(0, window.util.EYES_COLORS.length - 1)]
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

  if (window.util.userSetup) {
    appendWizards();

    if (window.util.setupOpen) {
      window.util.setupOpen.addEventListener('click', window.setupControls.openSetup);
      window.util.setupOpen.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          window.setupControls.openSetup();
        }
      });

      window.util.setupClose.addEventListener('keydown', function (evt) {

        if (evt.key === 'Enter') {
          window.setupControls.closeSetup();
        }
      });

    }
  }
})();
