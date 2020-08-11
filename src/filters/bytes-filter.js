import Vue from 'vue'

Vue.filter('bytes', function (num) {
  // jacked from: https://github.com/sindresorhus/pretty-bytes
  num = Number(num);
  if (isNaN(num)) {
    throw new TypeError('Expected a number');
  }

  var neg = num < 0;
  var units = ['B', 'kB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];

  if (neg) {
    num = -num;
  }

  if (num < 1) {
    return (neg ? '-' : '') + num + ' B';
  }

  var exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);
  num = (num / Math.pow(1000, exponent)).toFixed(2) * 1;
  var unit = units[exponent];

  return (neg ? '-' : '') + num + ' ' + unit;
});

