'use strict';
(function () {
  var ESC_CODE = 'Escape';
  var ENTER_CODE = 'Enter';

  function onError(error) {
    var div = document.createElement('div');
    div.innerHTML = 'УПС! Что то пошло не так <br>' + error;
    div.classList.add('error__popup');
    document.body.appendChild(div);
    setTimeout(function () {
      document.body.querySelector('.error__popup').remove();
    }, 3000);
  }

  window.util = {
    ESC_CODE: ESC_CODE,
    ENTER_CODE: ENTER_CODE,
    getRandomInRange: function getRandomInRange(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    onError: onError,
  };
})();
