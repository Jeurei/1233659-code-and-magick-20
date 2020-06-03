'use strict';
var userSetup = document.querySelector('.setup');
var simillarSetup = document.querySelector('.setup-similar');
var simillarList = userSetup.querySelector('.setup-similar-list');
var temp = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var coatColor = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var eyesColor = ['black', 'red', 'blue', 'yellow', 'green'];
// функция чтобы шафлить массивы,но я не знаю как её лучше применить,то есть в каком моменте и как часто шафлить
// function shuffle(a) {
//   var j; var x; var i;
//   for (i = a.length - 1; i > 0; i--) {
//     j = Math.floor(Math.random() * (i + 1));
//     x = a[i];
//     a[i] = a[j];
//     a[j] = x;
//   }
//   return a;
// }

function renderWizards(arr) {
  var frag = document.createDocumentFragment();
  arr.forEach(function (el) {
    var wizardEl = temp.cloneNode(true);
    wizardEl.querySelector('.setup-similar-label').textContent = el.name;
    wizardEl.querySelector('.wizard-coat').style.fill = el.coatColor;
    wizardEl.querySelector('.wizard-eyes').style.fill = el.eyesColor;
    frag.appendChild(wizardEl);
  });
  // вариант со стандартным for
  // for (var i = 0; i < arr.length; i++) {
  //   var wizardEl = temp.cloneNode(true);
  //   wizardEl.querySelector('.setup-similar-label').textContent = arr[i].name;
  //   wizardEl.querySelector('.wizard-coat').style.fill = arr[i].coatColor;
  //   wizardEl.querySelector('.wizard-eyes').style.fill = arr[i].eyesColor;
  //   frag.appendChild(wizardEl);
  // }
  return frag;
}

function createWizardObj() {
  var obj = {};
  obj.name = WIZARD_NAMES[Math.floor(Math.random() * WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[Math.floor(Math.random() * WIZARD_SURNAMES.length)];
  obj.coatColor = coatColor[Math.floor(Math.random() * coatColor.length)];
  obj.eyesColor = eyesColor[Math.floor(Math.random() * eyesColor.length)];
  return obj;
}

function createWizard() {
  var arr = [];
  for (var i = 0; i < 4; i++) {
    arr.push(createWizardObj(name));
  }
  return renderWizards(arr);
}

function appendWizards() {
  simillarList.appendChild(createWizard());
  simillarSetup.classList.remove('hidden');
}

if (userSetup) {
  appendWizards();
  userSetup.classList.remove('hidden');
}
