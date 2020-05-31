'use strict';
var BOX_WIDTH = 420;
var BOX_HEIGHT = 270;
var BOX_X = 150;
var FONT_Y = 270;
var BOX_Y = 10;
var GAP = 10;
var FONT_GAP = 15;
var TEXT_WIDTH = 50;
var BAR_WIDTH = 20;
var FONT_SIZE = 16;
var FONT_FAM = 'PT Mono';
var FONT = FONT_SIZE + 'px ' + FONT_FAM;
var barHeight = BOX_HEIGHT - GAP - GAP - GAP - FONT_SIZE;


function findMax(arr) {
  return Math.max.apply(null, arr);
}

function renderBox(ctx, x, y, color) {
  ctx.fillStyle = color;
  ctx.fillRect(x, y, BOX_WIDTH, BOX_HEIGHT);
}

window.renderStatistics = function (ctx, names, times) {
  renderBox(ctx, BOX_X + GAP, BOX_Y + GAP, 'rgba(0,0,0,0.3');
  renderBox(ctx, BOX_X, BOX_Y, 'white');

  var max = findMax(times);
  var color = 1337;
  ctx.font = FONT;
  ctx.fillStyle = '#000';
  for (var i = 0; i < names.length; i++) {
    ctx.fillText(
        names[i],
        BOX_X + GAP + FONT_GAP + (GAP + TEXT_WIDTH + BAR_WIDTH) * i,
        FONT_Y - GAP
    );
    ctx.fillRect(
        BOX_X + GAP + FONT_GAP + (GAP + TEXT_WIDTH + BAR_WIDTH) * i,
        BOX_HEIGHT - (barHeight * times[i]) / max - FONT_SIZE - GAP,
        BAR_WIDTH,
        (barHeight * times[i]) / max
    );
    ctx.fillStyle = '#' + color;
    color += 666;
  }
};
