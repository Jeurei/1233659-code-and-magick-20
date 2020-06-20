'use strict';
window.setupControls = (function () {
  var MIN_NAME_LENGTH = 2;
  var MAX_NAME_LENGTH = 25;
  var userName = document.querySelector('.setup-user-name');
  var setupSubmit = document.querySelector('.setup-submit');


  var onSetupEscPress = function (evt) {

    if (evt.key === window.util.ESC_CODE && document.activeElement !== userName) {
      evt.preventDefault();
      closeSetup();
    }

  };

  var onSetupEnterPress = function (evt) {

    if (evt.key === window.ENTER_CODE) {
      window.util.userSetup.classList.add('hidden');
      window.util.userSetup.submit();
    }

  };

  var onSubmitSetup = function () {
    window.util.userSetup.classList.add('hidden');
    window.util.userSetup.submit();
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
  var openSetup = function () {
    window.util.userSetup.classList.remove('hidden');

    document.addEventListener('keydown', onSetupEscPress);

    setupSubmit.addEventListener('click', onSubmitSetup);

    setupSubmit.addEventListener('keydown', onSetupEnterPress);

    userName.addEventListener('invalid', checkInvalidUserName);

    userName.addEventListener('input', checkInvalidInput);

    window.util.userCoat.addEventListener('click', window.customPlayerMage.changeCoat);

    window.util.userEyes.addEventListener('click', window.customPlayerMage.changeEyes);

    window.util.userFireball.addEventListener('click', window.customPlayerMage.changeFireball);

    window.util.setupClose.addEventListener('click', closeSetup);

    window.util.setupOpen.removeEventListener('click', openSetup);
  };

  var closeSetup = function () {
    window.util.userSetup.classList.add('hidden');

    window.util.userSetup.style.top = window.move.START_CORD_Y + 'px';
    window.util.userSetup.style.left = window.move.START_CORD_X + '%';

    document.removeEventListener('keydown', onSetupEscPress);

    setupSubmit.removeEventListener('click', onSubmitSetup);

    setupSubmit.removeEventListener('keydown', onSetupEnterPress);

    userName.removeEventListener('invalid', checkInvalidUserName);

    userName.removeEventListener('input', checkInvalidInput);

    window.util.userCoat.removeEventListener('click', window.changeCoat);

    window.util.userEyes.removeEventListener('click', window.changeEyes);

    window.util.userFireball.removeEventListener('click', window.changeFireball);

    window.util.setupOpen.addEventListener('click', openSetup);

    window.util.setupClose.removeEventListener('click', closeSetup);

  };
  return {
    openSetup: openSetup,
    closeSetup: closeSetup,
  };
})();
