var fs = require('fs');
var list = fs.readFileSync('./test4.txt').toString().split('\n').map(Number).filter(Boolean);
var MinHeap = require('./minHeap');

var heap = new MinHeap();

heap.insert(5);
