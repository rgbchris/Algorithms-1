// var lines = [3,7,1,2,4,5,6];
// Q1: 13
// Q2: 15
// Q3: 11
var lines = [9, 3, 8, 2, 1, 4, 6, 7, 5];
// Q1 = 24
// Q2 = 19
// Q3 = 16
var comparisons = 0;

function median(values) {

    values.sort( function(a,b) {return a - b;} );

    var half = Math.floor(values.length/2);

    if(values.length % 2)
        return values[half];
    else
        return (values[half-1] + values[half]) / 2.0;
}

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

  // Q3
  var fst = p;
  
  var tmp = [arr[fst], arr[Math.floor((r) / 2)], arr[r]].sort(function(a, b) {
    return a - b;
  });

  for (var i = p; i <= r; i++) {
    if (arr[i] === tmp[1]) {
      p = i; // the indx of the median
    }
  }
  // p = arr.indexOf(tmp[1]); // should be indexOf subarray p to r
  
  // p = median
  // fst = first
  // r = last 

  swap(arr, p, fst);

  // Q2
  // swap(arr, p, r);

  var q = partition(arr, p, r);
  quickSort(arr, p, q - 1);
  quickSort(arr, q + 1, r);
}

// Q1 & Q2
quickSort(lines, 0, lines.length-1);

console.log('lines', lines);
console.log('comparisons', comparisons);

