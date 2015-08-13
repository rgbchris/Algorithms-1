// The goal of this problem is to implement the "Median Maintenance" algorithm 
// (covered in the Week 5 lecture on heap applications). The text file contains 
// a list of the integers from 1 to 10000 in unsorted order; you should treat 
// this as a stream of numbers, arriving one by one. Letting xi denote the ith 
// number of the file, the kth median mk is defined as the median of the numbers 
// x1,…,xk. (So, if k is odd, then mk is ((k+1)/2)th smallest number among x1,…,xk; 
// if k is even, then mk is the (k/2)th smallest number among x1,…,xk.)

// In the box below you should type the sum of these 10000 medians, modulo 10000 
// (i.e., only the last 4 digits). That is, you should compute (m1+m2+m3+⋯+m10000)mod10000.

// OPTIONAL EXERCISE: Compare the performance achieved by heap-based and search-tree-based 
// implementations of the algorithm.

var fs = require('fs');
var list = fs.readFileSync('./Median.txt').toString().split('\n').map(Number).filter(Boolean);

var minHeap = [];
var maxHeap = [];

list.forEach(function(k, i) {
  // second pass
  if (i === 1) return;

  // first pass
  if (i === 0) {
    if (k < list[(i+1)]) {
      maxHeap.push(k);
      minHeap.push(list[(i+1)])
    } else {
      maxHeap.push(list[(i+1)])
      minHeap.push(k);
    }
  }

  if (k < maxHeap[0]) {
    maxHeap.push(k);
  } else {
    minHeap.push(k);
  }

  // odd
  // if (k % 2 > 0) {
  // // even
  // } else {
  // }
});

function balance() {
}

function getMedian() {
  // If even calculate median and return
  if (minHeap.length === maxHeap.length) {
    return (maxHeap[0] + minHeap[0]) / 2
  } else {
    // else take root of tree with more values
    if (minHeap.length > maxHeap.length) {
      return minHeap[0];
    } else {
      return maxHeap[0];
    }
  }
}
