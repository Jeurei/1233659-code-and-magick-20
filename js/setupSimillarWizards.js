'use strict';
(function () {
  var QUANTITY_OF_WIZARDS = 4;
  var userSetup = document.querySelector('.setup');
  var simillarSetup = document.querySelector('.setup-similar');
  var simillarList = userSetup.querySelector('.setup-similar-list');
  var template = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');


  function createArray(data) {
    var arr = [];
    for (var i = 0; i < QUANTITY_OF_WIZARDS; i++) {
      var id = window.util.getRandomInRange(0, data.length - 1);
      arr.push(data[id]);
      data.splice(data[id], 1);
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
})();
