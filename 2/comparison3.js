// QUESTION 3

// DIRECTIONS FOR THIS PROBLEM:

// Compute the number of comparisons (as in Problem 1), using the "median-of-three" pivot rule. 
// [The primary motivation behind this rule is to do a little bit of extra work to get much 
// better performance on input arrays that are nearly sorted or reverse sorted.] In more detail,
// you should choose the pivot as follows. Consider the first, middle, and final elements of the 
// given array. (If the array has odd length it should be clear what the "middle" element is; for i
// an array with even length 2k, use the kth element as the "middle" element. So for the array 
// 4 5 6 7, the "middle" element is the second one ---- 5 and not 6!) Identify which of these three 
// elements is the median (i.e., the one whose value is in between the other two), and use this as 
// your pivot. As discussed in the first and second parts of this programming assignment, be sure to 
// implement Partition exactly as described in the video lectures (including exchanging the pivot 
// element with the first element just before the main Partition subroutine).

// EXAMPLE: For the input array 8 2 4 5 7 1 you would consider the first (8), middle (4), and last (1) 
// elements; since 4 is the median of the set {1,4,8}, you would use 4 as your pivot element.

// SUBTLE POINT: A careful analysis would keep track of the comparisons made in identifying the median 
// of the three candidate elements. You should NOT do this. That is, as in the previous two problems, 
// you should simply add m−1 to your running total of comparisons every time you recurse on a subarray
//  with length m.

var fs = require('fs'),
    lines = fs.readFileSync('./text.txt').toString().split("\n").filter(Boolean).map(Number),
    // lines = fs.readFileSync('./tests/10.txt').toString().split("\n").filter(Boolean).map(Number),   // Comparisons: 21
    // lines = fs.readFileSync('./tests/100.txt').toString().split("\n").filter(Boolean).map(Number),  // Comparisons: 518
    // lines = fs.readFileSync('./tests/1000.txt').toString().split("\n").filter(Boolean).map(Number), // Comparisons: 8921
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
  if (p >= r) return;

  comparisons += Math.abs(p - r);

  var medianArr = [arr[p], arr[Math.floor(Math.abs(p - r) / 2) + p], arr[r]].sort(function(a, b) {
    return a - b;
  });

  swap(arr, arr.indexOf(medianArr[1]), p);

  var q = partition(arr, p, r);
  quickSort(arr, p, q - 1);
  quickSort(arr, q + 1, r);
}

quickSort(lines, 0, lines.length - 1);

console.log('Total Comparisons: ', comparisons);

