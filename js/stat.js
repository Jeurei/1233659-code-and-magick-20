'use strict';
var BOX_WIDTH = 420;
var BOX_HEIGHT = 270;
var BOX_X = 100;
var BOX_Y = 10;
var BOX_SHIFT = 10;
var ANNOUNCE_SHIFT = 25;
var FONT_Y = BOX_HEIGHT - 10;
var BAR_Y = FONT_Y;
var GAP = 50;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 40;
var BAR_X = BOX_X;
var BAR_GAP = TEXT_WIDTH + BAR_WIDTH;
var FONT_SIZE = 16;
var FONT_FAM = 'PT Mono';
var FONT = FONT_SIZE + 'px ' + FONT_FAM;
var MAX_BAR_HEIGHT = 150;
var PLAYER_COLOR = 'rgba(255, 0, 0, 1)';

function findMax(arr) {
  return Math.max.apply(null, arr);
}

function renderBox(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BOX_WIDTH, BOX_HEIGHT);
}
window.renderStatistics = function (ctx, names, times) {
  renderBox(ctx, BOX_X + BOX_SHIFT, BOX_Y + BOX_SHIFT, 'rgba(0,0,0,0.7');
  renderBox(ctx, BOX_X, BOX_Y, 'white');
  var max = findMax(times);
  ctx.font = FONT;
  ctx.fillStyle = '#000';
  ctx.fillText('Ура вы победили!', BOX_X + BOX_SHIFT, BOX_Y + BOX_SHIFT + ANNOUNCE_SHIFT);
  ctx.fillText('Список результатов:', BOX_X + BOX_SHIFT, BOX_Y + BOX_SHIFT + ANNOUNCE_SHIFT + FONT_SIZE);
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(names[i], BAR_X + GAP + FONT_GAP + (TEXT_WIDTH + BAR_WIDTH) * i, FONT_Y);
    ctx.fillStyle = names[i] === 'Вы' ? PLAYER_COLOR : 'hsl(240,' + Math.round(1 - 0.5 + Math.random() * (100 - 1 + 1)) + '%,50%)';
    ctx.fillRect(BOX_X + GAP + FONT_GAP + BAR_GAP * i, BAR_Y - (MAX_BAR_HEIGHT * times[i]) / max - FONT_SIZE, BAR_WIDTH, (MAX_BAR_HEIGHT * times[i]) / max);
    ctx.fillStyle = '#000';
    ctx.fillText(Math.round(times[i]), BAR_X + GAP + FONT_GAP + BAR_GAP * i, BOX_HEIGHT - (MAX_BAR_HEIGHT * times[i]) / max - FONT_SIZE - FONT_SIZE);
  }
};
