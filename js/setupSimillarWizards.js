'use strict';
(function () {
  var QUANTITY_OF_WIZARDS = 4;
  var userSetup = document.querySelector('.setup');
  var simillarSetup = document.querySelector('.setup-similar');
  var simillarList = userSetup.querySelector('.setup-similar-list');
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  var currentCoatColor;
  var currentEyesColor;
  var wizards;

  function updateCurrentColors() {
    currentCoatColor = window.customPlayerMage.coatColor;
    currentEyesColor = window.customPlayerMage.eyesColor;
  }

  function namesComparator(left, right) {
    if (left > right) {
      return 1;
    } else if (left < right) {
      return -1;
    } else {
      return 0;
    }
  }

  var getRank = function (wizard) {
    var rank = 0;

    if (wizard.colorCoat === currentCoatColor) {
      rank += 2;
    }
    if (wizard.colorEyes === currentEyesColor) {
      rank += 1;
    }

    return rank;
  };

  function createArray(data) {
    var arr = [];

    if (data) {
      wizards = data;
    }

    updateCurrentColors();

    var sortedWizards = wizards.sort(function (left, right) {
      var diff = getRank(right) - getRank(left);
      if (diff === 0) {
        diff = namesComparator(left.name, right.name);
      }
      return diff;
    });

    for (var i = 0; i < QUANTITY_OF_WIZARDS; i++) {
      arr.push(sortedWizards[i]);
    }

    return arr;
  }

  function renderWizards(arr) {
    var fragment = document.createDocumentFragment();

    arr.forEach(function (el) {
      var wizardEl = template.cloneNode(true);
      wizardEl.querySelector('.setup-similar-label').textContent = el.name;
      wizardEl.querySelector('.wizard-coat').style.fill = el.colorCoat;
      wizardEl.querySelector('.wizard-eyes').style.fill = el.colorEyes;
      fragment.appendChild(wizardEl);
    });
    return fragment;
  }

  function onSuccess(data) {
    simillarList.appendChild(renderWizards(createArray(data)));
    simillarSetup.classList.remove('hidden');
  }

  function updateWizards() {
    simillarList.innerHTML = '';
    simillarList.appendChild(renderWizards(createArray()));
  }

  if (userSetup) {
    window.backend.load(onSuccess, window.util.onError);

    if (setupOpen) {
      setupOpen.addEventListener('click', window.setupControls.openSetup);
      setupOpen.addEventListener('keydown', function (evt) {
        if (evt.key === 'Enter') {
          window.setupControls.openSetup();
        }
      });

      setupClose.addEventListener('keydown', function (evt) {

        if (evt.key === 'Enter') {
          window.setupControls.closeSetup();
        }
      });

    }
  }
  window.setupSimillarWizards = {
    updateWizards: updateWizards,
  };
})();
