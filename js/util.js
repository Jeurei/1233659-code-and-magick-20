'use strict';
window.util = (function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var ESC_CODE = 'Escape';
  var ENTER_CODE = 'Enter';
  var userSetup = document.querySelector('.setup');
  var coatColor = userSetup.querySelector('.coat-color');
  var eyesColor = userSetup.querySelector('.eyes-color');
  var fireballColor = userSetup.querySelector('.fireball-color');
  var userCoat = userSetup.querySelector('.wizard-coat');
  var userEyes = userSetup.querySelector('.wizard-eyes');
  var userFireball = userSetup.querySelector('.setup-fireball-wrap');
  var setupOpen = document.querySelector('.setup-open');
  var setupClose = document.querySelector('.setup-close');
  return {
    ESC_CODE: ESC_CODE,
    ENTER_CODE: ENTER_CODE,
    EYES_COLORS: EYES_COLORS,
    FIREBALL_COLORS: FIREBALL_COLORS,
    COAT_COLORS: COAT_COLORS,
    userSetup: userSetup,
    coatColor: coatColor,
    eyesColor: eyesColor,
    fireballColor: fireballColor,
    userCoat: userCoat,
    userEyes: userEyes,
    userFireball: userFireball,
    setupOpen: setupOpen,
    setupClose: setupClose,
    getRandomInRange: function getRandomInRange(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
  };
})();
