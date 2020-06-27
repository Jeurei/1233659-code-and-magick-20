'use strict';
(function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;
  var userName = document.querySelector('.setup-user-name');
  var setupSubmit = document.querySelector('.setup-submit');
  var setupForm = document.querySelector('.setup-wizard-form');
  var userSetup = document.querySelector('.setup');
  var userCoat = userSetup.querySelector('.wizard-coat');
  var userEyes = userSetup.querySelector('.wizard-eyes');
  var userFireball = userSetup.querySelector('.setup-fireball-wrap');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');

  var onSetupEscPress = function (evt) {

    if (evt.key === window.util.ESC_CODE && document.activeElement !== userName) {
      evt.preventDefault();
      closeSetup();
    }

  };

  var onSetupEnterPress = function (evt) {

    if (evt.key === window.ENTER_CODE) {
      userSetup.classList.add('hidden');
      userSetup.submit();
    }

  };

  var onSucessSubmit = function () {
    userSetup.classList.add('hidden');
    setupSubmit.removeEventListener('click', onSubmitSetup);
  };

  var onSubmitSetup = function (evt) {
    evt.preventDefault();
    window.backend.save(new FormData(setupForm), onSucessSubmit, window.util.onError);
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
  var openSetup = function () {
    userSetup.classList.remove('hidden');

    document.addEventListener('keydown', onSetupEscPress);

    setupSubmit.addEventListener('click', onSubmitSetup);

    setupSubmit.addEventListener('keydown', onSetupEnterPress);

    userName.addEventListener('invalid', checkInvalidUserName);

    userName.addEventListener('input', checkInvalidInput);

    userCoat.addEventListener('click', window.customPlayerMage.changeCoat);

    userEyes.addEventListener('click', window.customPlayerMage.changeEyes);

    userFireball.addEventListener('click', window.customPlayerMage.changeFireball);

    setupSubmit.addEventListener('submit', window.customPlayerMage.setupSubmit);

    setupClose.addEventListener('click', closeSetup);

    setupOpen.removeEventListener('click', openSetup);
  };

  var closeSetup = function () {
    userSetup.classList.add('hidden');

    userSetup.style.top = window.move.START_CORD_Y + 'px';
    userSetup.style.left = window.move.START_CORD_X + '%';

    document.removeEventListener('keydown', onSetupEscPress);

    setupSubmit.removeEventListener('click', onSubmitSetup);

    setupSubmit.removeEventListener('keydown', onSetupEnterPress);

    userName.removeEventListener('invalid', checkInvalidUserName);

    userName.removeEventListener('input', checkInvalidInput);

    userCoat.removeEventListener('click', window.changeCoat);

    userEyes.removeEventListener('click', window.changeEyes);

    userFireball.removeEventListener('click', window.changeFireball);

    setupSubmit.removeEventListener('submit', window.customPlayerMage.setupSubmit);

    setupOpen.addEventListener('click', openSetup);

    setupClose.removeEventListener('click', closeSetup);

  };
  window.setupControls = {
    openSetup: openSetup,
    closeSetup: closeSetup,
  };
})();
