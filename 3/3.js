// This file contains the adjacency list representation of a simple undirected graph. 
// There are 200 vertices labeled 1 to 200. The first column in the file represents 
// the vertex label, and the particular row (other entries except the first column) 
// tells all the vertices that the vertex is adjacent to. So for example, the 6th row 
// looks like : "6 155 56 52 120......". This just means that the vertex with label 6 
// is adjacent to (i.e., shares an edge with) the vertices with labels 155,56,52,120,
// ......,etc

// Your task is to code up and run the randomized contraction algorithm for the min 
// cut problem and use it on the above graph to compute the min cut (i.e., the 
// minimum-possible number of crossing edges). (HINT: Note that you'll have to figure 
// out an implementation of edge contractions. Initially, you might want to do this 
// naively, creating a new graph from the old every time there's an edge contraction. 
// But you should also think about more efficient implementations.) (WARNING: As per 
// the video lectures, please make sure to run the algorithm many times with different 
// random seeds, and remember the smallest cut that you ever find.) Write your numeric 
// answer in the space provided. So e.g., if your answer is 5, just type 5 in the 
// space provided.

var fs = require('fs'),
    lines = fs.readFileSync('./kargerMinCut.txt').toString().split("\n");
    lines.splice(-1, 1);

lines = lines.map(function(el) {
  return el.split("\t").map(Number).filter(Boolean);
});

function createEdgeArray(list) {
  var obj = {};

  list.forEach(function(arr, indx) {
    obj[arr.shift()] = arr;
  });

  return obj
}
            
function findAllEdges(store) {
  var edgeArr = [];

  // Each Vertex
  Object.keys(store).forEach(function(vertex) {
    var vertexCache = [];

    // Each adjacent vertices
    store[vertex].forEach(function(adjVertex) {
      var edge = [vertex, adjVertex];

      edge.sort(function(a, b) {
        return parseInt(a) - parseInt(b);
      });

      var edgeString = edge.join();

      if (edgeArr.indexOf(edgeString) === -1) {
        vertexCache.push(edgeString);
      }
    });

    edgeArr = edgeArr.concat(vertexCache);
  });
   
  return edgeArr;
}

function random(ceiling) {
  return ceiling === 0 ? 0 : Math.round(Math.random() * (ceiling - 1));
}

function getAllIndexes(arr, val) {
  var indexes = [], i;
  for (i = 0; i < arr.length; i++) {
    if (arr[i] === parseInt(val)) {
      indexes.push(i);
    }
  }
  return indexes;
}

function merge(u,v,obj) {
  obj[u] = obj[u].concat(obj[v]);
  delete obj[v];

  // merge and remove selfloops
  Object.keys(obj).forEach(function(key) {
    if (obj[key].indexOf(v) > -1) {
      var mergedVertexIndiceses = getAllIndexes(obj[key], v);

      mergedVertexIndiceses.forEach(function(el) {
        obj[key][el] = parseInt(u);
      });
    }

    if (obj[key].indexOf(key) > -1) {
      var selfLoopVertices = getAllIndexes(obj[key], key);

      selfLoopVertices.forEach(function(el) {
        obj[key][el] = undefined;
      });

      obj[key] = obj[key].filter(Boolean);
    }

  });
   
  return obj;
}

function findMinCut(obj) {
  var edgesList, randomEdge, u, v;

  while (Object.keys(obj).length > 2) {
    
    // This is not uniformly random
    u = Object.keys(obj)[random(Object.keys(obj).length - 1)];
    v = obj[u][random(obj[u].length - 1)];

    merge(u, v, obj);
  }

  // return findAllEdges(obj).length;
  return obj;
}



function clone(obj) {
  if (null == obj || "object" != typeof obj) return obj;
  var copy = obj.constructor();
  for (var attr in obj) {
    if (obj.hasOwnProperty(attr)) copy[attr] = obj[attr];
  }
  return copy;
}

(function() {

  var baseObject = createEdgeArray(lines);
  var minCutArr = [];

  for (var i = 0; i < 100; i++) {
    var adjacencyList = clone(baseObject);
    var minCutVal = findMinCut(adjacencyList);

    minCutArr.push( minCutVal[Object.keys(minCutVal)[0]].length ); 
  }

  console.log('Min Cut: ', Math.min.apply(null, minCutArr));
})();





