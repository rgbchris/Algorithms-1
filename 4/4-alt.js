// The file contains the edges of a directed graph. Vertices are labeled as positive 
// integers from 1 to 875714. Every row indicates an edge, the vertex label in first 
// column is the tail and the vertex label in second column is the head (recall the 
// graph is directed, and the edges are directed from the first column vertex to the 
// second column vertex). So for example, the 11th row looks liks : "2 47646". This 
// just means that the vertex with label 2 has an outgoing edge to the vertex with 
// label 47646

// Your task is to code up the algorithm from the video lectures for computing strongly 
// connected components (SCCs), and to run this algorithm on the given graph. 

// Output Format: You should output the sizes of the 5 largest SCCs in the given graph, 
// in decreasing order of sizes, separated by commas (avoid any spaces). So if your 
// algorithm computes the sizes of the five largest SCCs to be 500, 400, 300, 200 and 100, 
// then your answer should be "500,400,300,200,100". If your algorithm finds less than 5 
// SCCs, then write 0 for the remaining terms. Thus, if your algorithm computes only 3 
// SCCs whose sizes are 400, 300, and 100, then your answer should be "400,300,100,0,0".

// WARNING: This is the most challenging programming assignment of the course. Because of the 
// size of the graph you may have to manage memory carefully. The best way to do this depends 
// on your programming language and environment, and we strongly suggest that you exchange 
// tips for doing this on the discussion forums.

var fs = require('fs'),
    graph = fs.readFileSync('./SCC.txt').toString().split('\n').map(function(str) {
      return  str.split(' ').filter(Number);
    });
    // test1 // [3,3,3,0,0];
    // test2 // [6,3,2,1,0];
    // test3 // [30,11,11,1,1,1,1, .....];
    graph.pop();

var revGraph = graph.map(function(edge) {
   return edge.slice().reverse();
});

function makeAdjacencyList(graph) {
  var list = {};
  graph.forEach(function(edge) {
    var vertex = list[edge[0]];
    if (!vertex) {
        list[edge[0]] = [];
    }
    list[edge[0]].push(edge[1]);
  });
  return list;
}

console.time('time');

var adjListRev = makeAdjacencyList(revGraph);
var adjList    = makeAdjacencyList(graph);

var pass = 0;
var t = 1;
var s = null;
var n = parseInt(Object.keys(adjList).sort(function(a,b) { return a - b }).pop());
var exploredNodes = [];
var times = {};
var revTimes = {};
var SCCs = {};
var list;

function findSCCs() {
  exploredNodes = new Array(n);

  list = pass ? adjList : adjListRev;

  for (var i = n; i > 0; i--) {
    if (!exploredNodes[i]) {
      if (pass) {
        s = i;
        SCCs[s] = 0;
      }
      DFS(i);
    }
  }
}

function DFS(i) {
  exploredNodes[i] = true;

  if (pass) {
    i = times[i];

    if (list[i]) {
      for (var n = 0; n < list[i].length; n++) {
        edge = list[i][n];
        if (!exploredNodes[revTimes[edge]]) {
          DFS(revTimes[edge]);
        }
      }
    }

    SCCs[s]++;
  } else {
    if (list[i]) {
      for (var n = 0; n < list[i].length; n++) {
        edge = list[i][n];
        if (!exploredNodes[edge]) {
          DFS(edge);
        }
      } 
    }

    times[t] = i;
    revTimes[i] = t;
    t++;
  }

}


findSCCs();
pass++;
findSCCs();

var answer = Object.keys(SCCs).map(function(key) {
    return SCCs[key]
}).sort(function(a,b) {
    return a - b;
}).slice(-5).reverse();
console.log(answer);

console.timeEnd('time');


