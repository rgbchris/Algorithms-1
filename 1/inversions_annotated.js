// a pair of array indices i and j, with i smaller than j, so that the earlier
// array entry (the ith entry) is bigger than the later one (the jth one)
//
// [1, 3, 5, 2, 4, 6]


// TEST CASES
// var lines = [1,3,5,2,4,6]; // => 3 
// var lines = [6,5,4,3,2,1]; // => 15
// var lines = [9, 12, 3, 1, 6, 8, 2, 5, 14, 13, 11, 7, 10, 4, 0]; // => 56
// var lines = [37, 7, 2, 14, 35, 47, 10, 24, 44, 17, 34, 11, 16, 48, 1, 39, 6, 33, 43, 26, 40, 4, 28, 5, 38, 41, 42, 12, 13, 21, 29, 18, 3, 19, 0, 32, 46, 27, 31, 25, 15, 36, 20, 8, 9, 49, 22, 23, 30, 45]; // => 590

var lines = [6,5,4,3,2,1];

function mergeAndCountSplitInv(arr, left, right) {
  var i = 0, j = 0, count = 0;

  console.log('MERGE');
  console.log('Arr:', arr);
  console.log('Left:', left);
  console.log('Right:', right);

  for (var k = 0; k < arr.length; k++) {
    // If the next element in the left arr is smaller
    if (left[i] < right[j]) {
      arr[k] = left[i];
      i++;
    // If the next element in the right arr is smaller
    } else if (right[j] < left[i]) {
      arr[k] = right[j];
      count += left.length - i;
      j++;
    } else if (j == right.length) {
      arr[k] = left[i];
      i++;
    } else if (i == left.length) {
      arr[k] = right[i];
      j++;
    }
  }

  console.log('sorted array: ', arr);
  console.log('count: ', count);

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

  console.log('SORT');
  console.log('Arr:', arr);
  console.log('Left:', left);
  console.log('Right:', right);

  x = sortAndCount(left);
  y = sortAndCount(right);
  z += mergeAndCountSplitInv(arr, left, right);

  console.log('RETURN')
  console.log('x: ' + x + ' + ' + 'y: ' + y + ' + ' + 'z: ' + z + ' = ' + ( x+y+z));

  return z;
}

console.log(sortAndCount(lines));
