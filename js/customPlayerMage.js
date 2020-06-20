'use strict';
window.customPlayerMage = (function () {
  var sliderCounter = 1;
  var changeCoat = function () {
    var current = sliderCounter % window.util.COAT_COLORS.length;
    window.util.userCoat.style.fill = window.util.COAT_COLORS[current];
    window.util.coatColor.value = window.util.COAT_COLORS[current];
    sliderCounter++;
  };

  var changeEyes = function () {
    var current = sliderCounter % window.util.EYES_COLORS.length;
    window.util.userEyes.style.fill = window.util.EYES_COLORS[current];
    window.util.eyesColor.value = window.util.EYES_COLORS[current];
    sliderCounter++;
  };

  var changeFireball = function () {
    var current = sliderCounter % window.util.FIREBALL_COLORS.length;
    window.util.userFireball.style.backgroundColor = window.util.FIREBALL_COLORS[current];
    window.util.fireballColor.value = window.util.FIREBALL_COLORS[current];
    sliderCounter++;
  };
  return {
    changeCoat: changeCoat,
    changeEyes: changeEyes,
    changeFireball: changeFireball,
  };
})();
