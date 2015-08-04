// QUESTION 1

// The file contains all of the integers between 1 and 10,000 (inclusive, with no repeats) 
// in unsorted order. The integer in the ith row of the file gives you the ith entry of an 
// input array.

// Your task is to compute the total number of comparisons used to sort the given input 
// file by QuickSort. As you know, the number of comparisons depends on which elements are 
// chosen as pivots, so we'll ask you to explore three different pivoting rules.

// You should not count comparisons one-by-one. Rather, when there is a recursive call on 
// a subarray of length m, you should simply add m−1 to your running total of comparisons. 
// (This is because the pivot element is compared to each of the other m−1 elements in the 
// subarray in this recursive call.)

// WARNING: The Partition subroutine can be implemented in several different ways, and 
// different implementations can give you differing numbers of comparisons. For this 
// problem, you should implement the Partition subroutine exactly as it is described in 
// the video lectures (otherwise you might get the wrong answer).

// DIRECTIONS FOR THIS PROBLEM:

// For the first part of the programming assignment, you should always use the first 
// element of the array as the pivot element.

var fs = require('fs'),
    lines = fs.readFileSync('./text.txt').toString().split("\n").filter(Boolean).map(Number),
    // lines = fs.readFileSync('./tests/10.txt').toString().split("\n").filter(Boolean).map(Number),   // Comparisons: 25
    // lines = fs.readFileSync('./tests/100.txt').toString().split("\n").filter(Boolean).map(Number),  // Comparisons: 615
    // lines = fs.readFileSync('./tests/1000.txt').toString().split("\n").filter(Boolean).map(Number), // Comparisons: 10297
    comparisons = 0;

function swap(arr, a, b) {
  if (a === b) return;
  var tmp = arr[a];
  arr[a] = arr[b];
  arr[b] = tmp;
}

// Lecture notes partition routine
function partition(arr, l, r) {
  var p = arr[l];
  var i = l+1;
  for (var j = l+1; j <= r; j++) {
    if (arr[j] < p) {
      swap(arr, j, i);
      i = i+1;
    }
  }
  // Array now partitioned around pivot
  swap(arr, l, i-1);
  return i-1;
}

function quickSort(arr, p, r) {
  if (p > r) return;

  comparisons += Math.abs(p - r);

  var q = partition(arr, p, r);
  quickSort(arr, p, q - 1);
  quickSort(arr, q + 1, r);
}

quickSort(lines, 0, lines.length - 1);

console.log('Total Comparisons: ', comparisons);

