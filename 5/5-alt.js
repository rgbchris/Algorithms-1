// The file contains an adjacency list representation of an undirected weighted graph with 200 
// vertices labeled 1 to 200. Each row consists of the node tuples that are adjacent to that 
// particular vertex along with the length of that edge. For example, the 6th row has 6 as the 
// first entry indicating that this row corresponds to the vertex labeled 6. The next entry of 
// this row "141,8200" indicates that there is an edge between vertex 6 and vertex 141 that has 
// length 8200. The rest of the pairs of this row indicate the other vertices adjacent to 
// vertex 6 and the lengths of the corresponding edges.

// Your task is to run Dijkstra's shortest-path algorithm on this graph, using 1 (the first vertex) 
// as the source vertex, and to compute the shortest-path distances between 1 and every other 
// vertex of the graph. If there is no path between a vertex v and vertex 1, we'll define the 
// shortest-path distance between 1 and v to be 1000000. 

// You should report the shortest-path distances to the following ten vertices, in order: 
// 7,37,59,82,99,115,133,165,188,197. You should encode the distances as a comma-separated string of 
// integers. So if you find that all ten of these vertices except 115 are at distance 1000 away from 
// vertex 1 and 115 is 2000 distance away, then your answer should be 1000,1000,1000,1000,1000,2000,
// 1000,1000,1000,1000. Remember the order of reporting DOES MATTER, and the string should be in the 
// same order in which the above ten vertices are given. Please type your answer in the space provided.

// IMPLEMENTATION NOTES: This graph is small enough that the straightforward O(mn) time 
// implementation of Dijkstra's algorithm should work fine. OPTIONAL: For those of you seeking an 
// additional challenge, try implementing the heap-based version. Note this requires a heap that 
// supports deletions, and you'll probably need to maintain some kind of mapping between vertices 
// and their positions in the heap.


var fs = require('fs');

var list = fs.readFileSync('./test1.txt').toString().split('\n').map(function(str) {
  if (!str) return;
  // var key = str.split('\t')[0];
  return str.split('\t').splice(1).map(function(str, indx, arr) { 
    if (indx === arr.length-1) return;
    return str.split(',').map(Number);
  }).filter(Boolean);

  // console.log(str.split('\t').splice(1).slice(0,-1));
});

function extractMin(pq, weights) {
  var i = 0,
      j = 0,
      m = weights[pq[0]];

  while (j < pq.length) {
    if (weights[pq[j]] < m) {
        i = j;
        m = weights[pq[j]];
    }
    j++;
  }
    
  res = pq[i];
  pq[i] = pq[pq.length-1];
  pq = pq.slice(0,-1);
  return {
    v: res,
    heap: pq
  }
}

function dijkstra(graph, s) {
  var n = Object.keys(graph).map(Number).pop();
  var weights = {};
  weights[s] = 0;

  var visited = new Array(n);

  var heap = Array.apply(null, Array(n-1)).map(function (_, i) {return i;});
  var v;

  while (heap.length > 0) {
    var tmp = extractMin(heap, weights);
    v = tmp.v;
    heap = tmp.heap;
    visited[v] = true;

    graph[v].forEach(function(edge) {
      if (!visited[edge[0]]) {
        weights[edge[0]] = Math.min(weights[edge[0]], parseInt(weights[v]) + parseInt(edge[1]));
        console.log(weights);
      }
    });
  }

  return weights;
}

console.log(dijkstra(list, 0));



