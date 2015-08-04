/**
 * Chris Amatangelo
 * Programming Question - 1
 */
var fs = require('fs');

var lines = fs.readFileSync('./IntegerArray.txt').toString().split("\n").filter(Boolean).map(Number);

function mergeAndCountSplitInv(arr, left, right) {
  var i = 0, j = 0, count = 0;

  for (var k = 0; k < arr.length; k++) {
    if (left[i] < right[j]) {
      arr[k] = left[i];
      i++;
    } else if (right[j] < left[i]) {
      arr[k] = right[j];
      count += left.length - i;
      j++;
    } else if (j == right.length) {
      arr[k] = left[i];
      i++;
    } else if (i == left.length) {
      arr[k] = right[j];
      j++;
    }
  }
  return count;
}

var x = 0;
var y = 0;
var z = 0;

function sortAndCount(arr) {
  if (arr.length < 2) return 0;

  var n = Math.floor(arr.length / 2);
  var right = arr.slice(n);
  var left  = arr.slice(0, n); 

  x = sortAndCount(left);
  y = sortAndCount(right);
  z += mergeAndCountSplitInv(arr, left, right);

  return z;
}

console.log( sortAndCount(lines) );
