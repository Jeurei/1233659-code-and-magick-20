'use strict';
(function () {
  var ESC_CODE = 'Escape';
  var ENTER_CODE = 'Enter';
  var DEBOUNCE_INTERVAL = 500;
  function onError(error) {
    var div = document.createElement('div');
    div.innerHTML = 'УПС! Что то пошло не так <br>' + error;
    div.classList.add('error__popup');
    document.body.appendChild(div);
    setTimeout(function () {
      document.body.querySelector('.error__popup').remove();
    }, 3000);
  }
  // это же декоратор да?
  function debounce(callback) {
    var lastTimeout = null;
    return function () {
      var parameters = arguments;

      if (lastTimeout) {
        window.clearTimeout(lastTimeout);
      }

      lastTimeout = window.setTimeout(function () {
        callback.apply(null, parameters);
      }, DEBOUNCE_INTERVAL);
    };
  }

  window.util = {
    ESC_CODE: ESC_CODE,
    ENTER_CODE: ENTER_CODE,
    getRandomInRange: function getRandomInRange(min, max) {
      return Math.floor(min + Math.random() * (max + 1 - min));
    },
    onError: onError,
    debounce: debounce,
  };
})();
