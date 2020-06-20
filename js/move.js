'use strict';

window.move = (function () {
  var START_CORD_Y = 80;
  var START_CORD_X = 50;

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

      window.util.userSetup.style.top = (window.util.userSetup.offsetTop - shift.y) + 'px';
      window.util.userSetup.style.left = (window.util.userSetup.offsetLeft - shift.x) + 'px';
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
  var userSetupAvatar = window.util.userSetup.querySelector('.upload');
  userSetupAvatar.addEventListener('mousedown', startDrag);
  return {
    START_CORD_Y: START_CORD_Y,
    START_CORD_X: START_CORD_X,
  };
})();
