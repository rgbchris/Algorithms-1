// The goal of this problem is to implement a variant of the 2-SUM algorithm 
// (covered in the Week 6 lecture on hash table applications). The file contains 
// 1 million integers, both positive and negative (there might be some repetitions!).
// This is your array of integers, with the ith row of the file specifying the ith 
// entry of the array.

// Your task is to compute the number of target values t in the interval [-10000,10000] 
// (inclusive) such that there are distinct numbers x,y in the input file that satisfy x+y=t. 
// (NOTE: ensuring distinctness requires a one-line addition to the algorithm from lecture.)

// Write your numeric answer (an integer between 0 and 20001) in the space provided.

// OPTIONAL CHALLENGE: If this problem is too easy for you, try implementing your own hash 
// table for it. For example, you could compare performance under the chaining and open 
// addressing approaches to resolving collisions.

var fs = require('fs');
// algo1-programming_prob-2sum
// test2 // => 6
var list = fs.readFileSync('./algo1-programming_prob-2sum.txt').toString().split('\n').sort(function(a, b) {
             return parseInt(a) - parseInt(b);
           }).filter(Boolean);
// https://class.coursera.org/algo-007/forum/thread?thread_id=646
// list.splice(-1);

console.time('time');

var hash = {};
var divisor = (10000 - (-10000));
// var divisor = (2 - (-2));
list.forEach(function(num) {
  var val = num / divisor;
  var key = val > 0 ? Math.floor(val) : Math.ceil(val);
  if (!hash[key]) {
    hash[key] = [];
  } 
  if (hash[key].indexOf(num) === -1) {
    hash[key].push(num);
  }
});

var values = {};

function calculate(x, y, values) {
  var key = parseInt(x) + parseInt(y);
  if (key > 10000 || key < -10000) {
    return;
  } else {
    if (!values[key]) {
      values[key] = true;
    }
  }
}

list.forEach(function(x) {
  // console.log(x);
  var a = ((-x - 10000) / 20000);
  var b = ((-x + 10000) / 20000);
  a = a > 0 ? Math.floor(a) : Math.ceil(a);
  b = b > 0 ? Math.floor(b) : Math.ceil(a);

  a = a === -0 ? 0 : a;
  b = b === -0 ? 0 : b;

  if (hash[a]) hash[a].forEach(function(y) {
    calculate(x,y,values);
  });

  if (hash[b]) hash[b].forEach(function(y) {
    calculate(x,y,values);
  });

});

console.log(Object.keys(values).length);
// console.log(values);

console.timeEnd('time');
