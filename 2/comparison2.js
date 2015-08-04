// QUESTION 2

// DIRECTIONS FOR THIS PROBLEM:

// Compute the number of comparisons (as in Problem 1), always using the final element of the 
// given array as the pivot element. Again, be sure to implement the Partition subroutine 
// exactly as it is described in the video lectures. Recall from the lectures that, just before 
// the main Partition subroutine, you should exchange the pivot element (i.e., the last element) 
// with the first element.

var fs = require('fs'),
    lines = fs.readFileSync('./text.txt').toString().split("\n").filter(Boolean).map(Number),
    // lines = fs.readFileSync('./tests/10.txt').toString().split("\n").filter(Boolean).map(Number),   // Comparisons: 29
    // lines = fs.readFileSync('./tests/100.txt').toString().split("\n").filter(Boolean).map(Number),  // Comparisons: 587
    // lines = fs.readFileSync('./tests/1000.txt').toString().split("\n").filter(Boolean).map(Number), // Comparisons: 10184
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
  swap(arr, p, r);

  var q = partition(arr, p, r);
  quickSort(arr, p, q - 1);
  quickSort(arr, q + 1, r);
}

quickSort(lines, 0, lines.length - 1);

console.log('Total Comparisons: ', comparisons);

