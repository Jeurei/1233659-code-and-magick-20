'use strict';
(function () {
  var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
  var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
  var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
  var userSetup = document.querySelector('.setup');
  var coatColor = userSetup.querySelector('.coat-color');
  var eyesColor = userSetup.querySelector('.eyes-color');
  var fireballColor = userSetup.querySelector('.fireball-color');
  var userCoat = userSetup.querySelector('.wizard-coat');
  var userEyes = userSetup.querySelector('.wizard-eyes');
  var userFireball = userSetup.querySelector('.setup-fireball-wrap');
  var sliderCounter = 1;

  var changeCoat = function () {
    var current = sliderCounter % COAT_COLORS.length;
    userCoat.style.fill = COAT_COLORS[current];
    coatColor.value = COAT_COLORS[current];
    window.customPlayerMage.coatColor = COAT_COLORS[current];
    window.util.debounce(window.setupSimillarWizards.updateWizards());
    sliderCounter++;
  };

  var changeEyes = function () {
    var current = sliderCounter % EYES_COLORS.length;
    userEyes.style.fill = EYES_COLORS[current];
    eyesColor.value = EYES_COLORS[current];
    window.customPlayerMage.eyesColor = EYES_COLORS[current];
    window.setupSimillarWizards.updateWizards();
    sliderCounter++;
  };

  var onChangeCoat = window.util.debounce(changeCoat);

  var onChangeEyes = window.util.debounce(changeEyes);


  var changeFireball = function () {
    var current = sliderCounter % FIREBALL_COLORS.length;
    userFireball.style.backgroundColor = FIREBALL_COLORS[current];
    fireballColor.value = FIREBALL_COLORS[current];
    window.customPlayerMage.fireballColor = FIREBALL_COLORS[current];
    sliderCounter++;
  };

  window.customPlayerMage = {
    changeCoat: onChangeCoat,
    changeEyes: onChangeEyes,
    changeFireball: changeFireball,
    coatColor: userCoat.style.fill,
    eyesColor: userEyes.style.fill,
    fireballColor: userFireball.style.backgroundColor,
  };
})();
