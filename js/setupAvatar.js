'use strict';

(function () {
  var VALID_TYPES = ['image', 'jpeg', 'image', 'png'];
  var userAvatar = document.querySelector('.setup-user-pic');
  var avatarInput = document.querySelector('.upload input[type=file]');


  function changeAvatar() {

    var loadAvatar = function () {
      userAvatar.src = reader.result;
    };

    var file = avatarInput.files[0];
    var fileName = file.name.toLowerCase();

    var matches = VALID_TYPES.some(function (element) {
      return fileName.endsWith(element);
    });

    if (matches) {
      var reader = new FileReader();

      reader.addEventListener('load', loadAvatar);

      reader.readAsDataURL(file);
    }

  }

  window.setupAvatar = {
    change: changeAvatar,
  };
})();
