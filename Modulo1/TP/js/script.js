//window.addEventListener('load', start);

var inputRed = null,
  inputGreen = null,
  inputBlue = null,
  inputHex = null,
  rangeRed = null,
  rangeGreen = null,
  rangeBlue = null;

function start() {
  rangeRed = document.querySelector('#rangeRed');
  rangeGreen = document.querySelector('#rangeGreen');
  rangeBlue = document.querySelector('#rangeBlue');

  inputRed = document.querySelector('#inputRed');
  inputGreen = document.querySelector('#inputGreen');
  inputBlue = document.querySelector('#inputBlue');

  inputHex = document.querySelector('#inputHex');

  rangeRed.addEventListener('input', setColor);
  rangeGreen.addEventListener('input', setColor);
  rangeBlue.addEventListener('input', setColor);

  setColor();
}

function setColor() {
  var red = parseInt(rangeRed.value, 10);
  var green = parseInt(rangeGreen.value, 10);
  var blue = parseInt(rangeBlue.value, 10);

  inputRed.value = red;
  inputGreen.value = green;
  inputBlue.value = blue;

  inputHex.value = rgbToHex(red, green, blue);

  var rgbCSS = rgb(red, green, blue);

  square.style.backgroundColor = rgbCSS;
}

function rgb(r, g, b) {
  return 'rgb(' + [r || 0, g || 0, b || 0].join(',') + ')';
}

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? '0' + hex : hex;
}

function rgbToHex(r, g, b) {
  return '#' + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

start();
