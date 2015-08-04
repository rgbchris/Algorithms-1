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
    graph = fs.readFileSync('./test3.txt').toString().split('\n').map(function(str) {
      return  str.split(' ').map(Number);
    });
    // test1 // [3,3,3,0,0];
    // test2 // [6,3,2,1,0];
    // test3 // [30,11,11,1,1,1,1, .....];
    graph.pop();


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

// Determine which pass we are in  
var pass = 1;

// Array of explored nodes
var exploredNodes;
var finishingTimes = {};

// use this to calculate finishing times of 1st pass
var t = 0;    // # of nodes explored so far (only used on 1st pass)
    
// most recent vertex from which a DFS was initiated (the leader)
var s = null; // current source vertex (only used on 2nd pass)

// 1st loop 1 to n is technically arbitrary,
// 2nd pass finishing times are indeed numbers from 1 to n (order matters here)
function findSCCs() {
  exploredNodes = [];
  var lastEntry = graph[graph.length - 1];
  var n = lastEntry[0] > lastEntry[1] ? lastEntry[0] : lastEntry[1]; 

  for (var i = n; i > 0; i--) {
    if (exploredNodes.indexOf(i) === -1) {
      s = i;
      console.log(i);
      pass === 1 ? DFS(graph, i) : DFS(graph, finishingTimes[i]);
    }
  }
}

function swap(json){
  var ret = {};
  for(var key in json){
    ret[json[key]] = parseInt(key);
  }
  return ret;
}

var SCCs = {};

var j, node, edge;

function DFS(graph, i) {
  // mark node i as explored
  pass === 1 ? exploredNodes.push(i) : exploredNodes.push(reverseTimes[i]);
  // - set leader(i) = nodes, which vertex did the DFS that discovered i get called?
  // when i was encountered what was s? well s was the leader of i

  if (pass === 2) {
    if (SCCs[s] === undefined) {
      SCCs[s] = 0;
    } else {
      if (!SCCs[s]) SCCs[s] = 1;
      SCCs[s]++;
    }
  }
  

  // recursively loop on arcs going out of i, ignore if explored
  // graph.forEach(function(edge) {
  for (var n = 0; n < graph.length; n++) {
    edge = graph[n];
    // j    = (pass === 1) ? graph[n][0] : graph[n][1];
    // node = (pass === 1) ? graph[n][1] : graph[n][0];
    j    = (pass === 1) ? edge[0] : edge[1];
    node = (pass === 1) ? edge[1] : edge[0];

    if (node === i) {
      // if j is not yet explored
      if (exploredNodes.indexOf(pass === 1 ? j : reverseTimes[j]) === -1) {
        DFS(graph, j) 
      }
    }
  }

  if (SCCs[s] === 0) SCCs[s] = 1;

  if (pass === 1) {
    t++;
    finishingTimes[t] = i;
  }
}

function go() {
  // reversed
  // finishing times calculated here, but made use on second pass
  findSCCs();
  pass++;

  reverseTimes = swap(finishingTimes);
  findSCCs();

  // var answer = Object.keys(SCCs).map(function(key) {
  //   return SCCs[key]
  // }).sort(function(a,b) {
  //   return a - b;
  // }).slice(-5).reverse();

  // console.log(answer);
}

go();

console.timeEnd('time');
