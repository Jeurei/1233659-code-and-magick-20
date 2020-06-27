'use strict';
(function () {
  var ESC_CODE = 'Escape';
  var ENTER_CODE = 'Enter';

  function onError(error) {
    // так?
    var div = document.createElement('div');
    div.style.width = '50%';
    div.style.height = '33%';
    div.style.fontSize = '30px';
    div.innerHTML = 'УПС! Что то пошло не так <br>' + error;
    div.style.position = 'fixed';
    div.style.top = '30%';
    div.style.left = '25%';
    div.style.color = '#000';
    div.style.display = 'flex';
    div.style.justifyContent = 'center';
    div.style.alignItems = 'center';
    div.style.backgroundColor = '#fff';
    div.classList.add('error__popup');
    document.body.appendChild(div);
    setTimeout(function () {
      document.body.querySelector('.error__popup').remove();
    }, 1000);
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
