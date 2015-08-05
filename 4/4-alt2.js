var fs = require('fs'),
    
    adjlist = [],
    adjlist_reversed = [],

    graph = fs.readFileSync('./SCC.txt').toString().split('\n').forEach(function(str) {
      if (!str) return;
      var edge = str.split(' ');
      var num1, num2, v_from, v_to, max_v;
      num1 = edge[0];
      num2 = edge[1];
      v_from = parseInt(num1);
      v_to   = parseInt(num2);
      max_v = Math.max.apply(Math, [v_from, v_to]);

      while (adjlist.length < max_v) {
        adjlist.push([]);
      }

      while (adjlist_reversed.length < max_v) {
        adjlist_reversed.push([]);
      }

      adjlist[v_from - 1].push(v_to - 1);
      adjlist_reversed[v_to - 1].push(v_from - 1);
    });

var s = null;
var times = [];
var t = 0;
var scc_size = 0;
var exploredNodes;

function dfsLoop(graph_rev, n) {
  exploredNodes = new Array(n);
  for (var i = n-1; i >= 0; i--) {
    if (!exploredNodes[i]) {
      s = i;
      dfs(graph_rev, i);
    }
  }
}


function dfsLoop2(graph) {
    exploredNodes = new Array(graph.length);
    var res = [];

    for (var i = graph.length - 1; i >= 0; i--) {
        if (!exploredNodes[times[i]]) {
            scc_size = 0;
            dfs2(graph, times[i]);
            res.push(scc_size);
        }
    }
    return res;
}

function dfs(graph_rev, i) {
    exploredNodes[i] = true;

    graph_rev[i].forEach(function(v) {
        if (!exploredNodes[v]) {
            dfs(graph_rev, v);
        } 
    });

    times[t] = i;
    t++;
}

function dfs2(graph, i) {
    exploredNodes[i] = true;

    graph[i].forEach(function(v) {
       if (!exploredNodes[v]) {
           dfs2(graph, v);
       } 
    });

    scc_size++;
}


function run() {
  dfsLoop(adjlist_reversed, adjlist_reversed.length);
  var res = dfsLoop2(adjlist);
  res.sort(function(a,b) {
    return a - b;
  });
  console.log(res.reverse().slice(0,5));
}

console.time('time');
run();
console.timeEnd('time');
