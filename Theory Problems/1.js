var fs  = require('fs');
var arr = fs.readFileSync('./numbers.txt').toString().split("\n").filter(Boolean).map(Number);

console.time('compute');
// var NanoTimer = require('nanotimer');
// var timerA = new NanoTimer();

// [Posted June 29th] You are given as input an unsorted array of n 
// distinct numbers, where n is a power of 2. Give an algorithm that 
// identifies the second-largest number in the array, and that uses 
// at most n+log2n−2 comparisons.

// var arr = [20, 39, 3, 4, 10, 49, 27, 8, 19, 5, 21, 29, 32, 71, 67, 83, 201, 391, 331, 400, 100, 949, 127, 118, 519, 75, 210, 294, 325, 715, 67, 483];


function chunk(arr, size) {
  var indx = 0,
      length = arr.length,
      resIndx = - 1,
      result = Array(arr.length / size);

    while (indx < length) {
      result[++resIndx] = [].slice.call(arr, indx, (indx += size));
    }
    return result;
}

var numCache = {};

function buildCache(numArray) {
  var winner = getMaxOfArray(numArray);
  if (!numCache[winner]) numCache[winner] = [];
  numCache[winner].push(getMinOfArray(numArray));
  return winner
}

function getMaxOfArray(numArray) {
  return Math.max.apply(null, numArray);
}

function getMinOfArray(numArray) {
  return Math.min.apply(null, numArray);
}

function findSecondLargest(arr) {
  if (arr.length === 2) {
    return getMaxOfArray(numCache[getMaxOfArray(arr)]);
  } else { 
    return findSecondLargest(chunk(arr, 2).map(buildCache));
  }
}

// console.log(arr);
// var runtimeSeconds = timerA.time(findSecondLargest, arr, 'u');
// console.log(runtimeSeconds);
console.log(findSecondLargest(arr));
console.timeEnd('compute');

