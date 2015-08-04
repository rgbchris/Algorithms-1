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
  return Math.round(Math.random() * (ceiling - 1));
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
    if (obj[key].indexOf(parseInt(v)) > -1) {
      var mergedVertexIndiceses = getAllIndexes(obj[key], v);

      mergedVertexIndiceses.forEach(function(el) {
        obj[key][el] = parseInt(u);
      });
    }

    if (obj[key].indexOf(parseInt(key)) > -1) {
      var selfLoopVertices = getAllIndexes(obj[key], key);

      selfLoopVertices.forEach(function(el) {
        obj[key][el] = undefined;
      });

      obj[key] = obj[key].filter(Boolean);
    }

  });
   
  // return obj;
}

function findMinCut(obj) {
  var edgesList, randomEdge;

  while (Object.keys(obj).length > 2) {
    // Accurate in terms of uniformly at random but slow
    edgesList  = findAllEdges(obj);
    randomEdge = edgesList[random(edgesList.length)].split(',');
    merge(randomEdge[0], randomEdge[1], obj);
  }

  return findAllEdges(obj).length;
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
  // var adjacencyList = clone( createEdgeArray(lines) );
  var minCutVal = findMinCut(createEdgeArray(lines));

  console.log(minCutVal);
})();






