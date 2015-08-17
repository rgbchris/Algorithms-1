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
// test4.txt // => 5
// "test10.txt"  = 4629, I got -5371
// "test100.txt" = 6138, I got 7213 
// "test1000.txt" = 8687, I got 1778 
// "test10000.txt" = 6283, I got -4101
var list = fs.readFileSync('./test100.txt').toString().split('\n').map(Number).filter(Boolean);
var MinHeap = require('./minHeap');
var MaxHeap = require('./maxHeap');

var minHeap = new MinHeap();
var maxHeap = new MaxHeap();
var medians = [];

list.forEach(function(k, i) {
  // second pass
  if (i === 1) {
    medians.push(k);
    return;
  }

  // first pass
  if (i === 0) {
    if (k < list[(i+1)]) {
      maxHeap.insert(k);
      minHeap.insert(list[(i+1)])
    } else {
      maxHeap.insert(list[(i+1)])
      minHeap.insert(k);
    }
    medians.push(k);
  } else {
    if (k < maxHeap.content[0]) {
      maxHeap.insert(k);
    } else {
      minHeap.insert(k);
    }

    checkBalance();
    medians.push(getMedian(i));
  }
});

var result = medians.reduce(function(prev, cur, index, array) {
    return prev + cur;
});

console.log(list.length);
console.log(result, result % 10000);

function checkBalance() {
  // If heaps are equal return
  if (minHeap.content.length === maxHeap.content.length) return;

  // Is any heap more than one node larger than the other?
  if (Math.abs(minHeap.content.length - maxHeap.content.length) > 1) {
    // Check which heap is larger and transfer
    if (minHeap.content.length > maxHeap.content.length) {
        maxHeap.insert(minHeap.extractMin());
    } else {
        minHeap.insert(maxHeap.extractMax());
    }
  }
}

function getMedian(i) {
  // If even calculate median and return
  if (minHeap.content.length === maxHeap.content.length) {
     return maxHeap.content[0];
    // return (maxHeap.content[0] + minHeap.content[0]) / 2;
  } else {
    // else take root of tree with more values
    if (minHeap.content.length > maxHeap.content.length) {
      return minHeap.content[0];
    } else {
      return maxHeap.content[0];
    }
  }
}

/*
function getMedian(i) {
  // If even calculate median and return
  if (minHeap.content.length === maxHeap.content.length) {
    if (i % 2 > 0) {
      return minHeap.content[0];
    } else {
      return maxHeap.content[0];
    }
    // return (maxHeap.content[0] + minHeap.content[0]) / 2;
  } else {
    // else take root of tree with more values
    if (minHeap.content.length > maxHeap.content.length) {
      return minHeap.content[0];
    } else {
      return maxHeap.content[0];
    }
  }
}
*/

