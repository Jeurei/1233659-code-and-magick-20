'use strict';

(function () {
  var START_CORD_Y = 80;
  var START_CORD_X = 50;
  var userSetup = document.querySelector('.setup');
  var userSetupAvatar = userSetup.querySelector('.upload');

  var startDrag = function (evt) {
    evt.preventDefault();

    var startCoords = {
      x: evt.clientX,
      y: evt.clientY
    };


    var dragged = false;

    var onMouseMove = function (moveEvt) {
      moveEvt.preventDefault();
      dragged = true;

      var shift = {
        x: startCoords.x - moveEvt.clientX,
        y: startCoords.y - moveEvt.clientY
      };

      startCoords = {
        x: moveEvt.clientX,
        y: moveEvt.clientY
      };

      userSetup.style.top = (userSetup.offsetTop - shift.y) + 'px';
      userSetup.style.left = (userSetup.offsetLeft - shift.x) + 'px';
    };

    var onMouseUp = function (upEvt) {
      upEvt.preventDefault();

      if (dragged) {
        var onClickPreventDefault = function (clickEvt) {
          clickEvt.preventDefault();
          userSetupAvatar.removeEventListener('click', onClickPreventDefault);
        };
        userSetupAvatar.addEventListener('click', onClickPreventDefault);
      }

      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  };
  userSetupAvatar.addEventListener('mousedown', startDrag);
  window.move = {
    START_CORD_Y: START_CORD_Y,
    START_CORD_X: START_CORD_X,
  };
})();
