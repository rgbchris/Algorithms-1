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
var list = fs.readFileSync('./test3.txt').toString().split('\n').sort(function(a, b) {
             return parseInt(a) - parseInt(b);
           });
// https://class.coursera.org/algo-007/forum/thread?thread_id=646
list.splice(-1);

var hash = {};
// var divisor = (10000 - (-10000));
var divisor = (2 - (-2));
list.forEach(function(num) {
  var key = num / divisor > 0 ? Math.floor(num / divisor) : Math.ceil(num / divisor);
  if (!hash[key]) {
    hash[key] = [];
  } 
  if (hash[key].indexOf(num) === -1) {
    hash[key].push(num);
  }
});

var values = {};

  function calculate(y) {
    if (x + y > 2 || x + y < -2) {
      return;
    } else {
      if (!values[x+y]) {
        values[x+y] = true;
      }
    }
  }
console.log(list);
list.forEach(function(x) {
  var a = ((-x - 2) / 4);
  var b = ((-x + 2) / 4);
  a = a > 0 ? Math.floor(a) : Math.ceil(a);
  b = b > 0 ? Math.floor(b) : Math.ceil(a);

  a = a === -0 ? 0 : a;
  b = b === -0 ? 0 : b;

  console.log(a,b);

  if (hash[a]) hash[a].forEach(calculate);
  if (hash[b]) hash[b].forEach(calculate);
});

// Object.keys(hash).forEach(function(key) {
  // for (var t = -10000; t <= 10000; t++) {
  //   var x = key;
  //   var y = hash[t - x] ? hash[t - x] : null;
  //
  //   if (y && !values[t]) {
  //     values[t] = 1;
  //   }
  // }
// });

// console.log(Object.keys(values).length);
console.log(values);

