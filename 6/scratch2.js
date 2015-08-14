Heap.prototype = {
    insert: function(node) {
        this.content.push(node);
        this.bubbleUp();
    },
    
    extractMin: function() {
       
        this.bubbleDown();
        return this.content;
    },

    /**
     * Run until heap property is restored.
     * At every node x, key[x] <= all of x's children
     */
    bubbleUp: function() {
        var indx, i = this.content.length-1;
        
        var swap = function(i1, i2) {
            var tmp = this.content[i1];
            this.content[i1] = this.content[i2];
            this.content[i2] = tmp;
        };

        var getParentIndx = function(i) {
            var indx;
            // odd
            if (i % 2 > 0) {
                indx = i === 1 ? 0 : Math.floor(i / 2);
            // even
            } else {
                indx = i === 2 ? 0 : (i / 2);
            }
            return indx;
        };

        var indx = getParentIndx(i);

        var parentNodeIndices = [indx];
        // keep checking parents until, a parent that is not less than new insertion is met
        while (indx > 0) {
            var indx = getParentIndx(indx);
            parentNodeIndices.push(indx);
        }

        var stop;
        // start at parent and see how far up the tree the
        // heap property is undone
        parentNodeIndices.reverse().forEach(function(indx) {
            if (this.content[i] < this.content[indx] && !stop) {
                stop = indx;   
            }
        }, this);

        var last;
        // start swapping to restore heap property
        parentNodeIndices.reverse().forEach(function(indx, currentItr) {
            if (indx < stop) return;
            if (currentItr === 0) {
                swap.call(this, i, indx);
            } else {
                swap.call(this, last, indx);
            }
            last = indx;
        }, this);

    },

    bubbleDown: function() {
        // Delete root
        this.content.splice(0,1);
        // Make last leaf new root
        this.content.unshift(this.content.splice(-1)[0])

        // var indx, i = this.content.length-1;
        
        var swap = function(i1, i2) {
            var tmp = this.content[i1];
            this.content[i1] = this.content[i2];
            this.content[i2] = tmp;
        };

        var indx = 0;
        var lvl = 0;
        var smallestChildIndices = [];
        while (indx < this.content.length-1) {
            var leftChild = (indx+1+lvl);
            var rightChild = (indx+2+lvl);
            var indx = this.content[leftChild] < this.content[rightChild] ? leftChild : rightChild;
            smallestChildIndices.push(indx);
            lvl++;
        }

        var treeHeight = Math.log(this.content.length) / Math.LN2;
        var treeHeightArr = new Array(treeHeight);
        treeHeightArr.forEach(function(el, indx) {
            1 + 1;
            return indx;
        });

        var getChildIndx = function(i) {
            var indx;
            // odd
            if (i % 2 > 0) {
                indx = i === 1 ? 0 : Math.floor(i / 2);
            // even
            } else {
                indx = i === 2 ? 0 : (i / 2);
            }
            return indx;
        };
    }
}

function Heap(content) {
    this.content = content || [];
}

// Insert
// var pq = new Heap([4,4,8,9,4,12,9,11,13,7,10]);

// pq.insert(5);

// console.log(pq.content);

// [4,4,5,9,4,8,9,11,13,7,10,12]



// Extract-min
var pq = new Heap([4,4,8,9,4,12,9,11,13]);

pq.extractMin();

console.log(pq.content);

// [4,4,8,9,13,12,9,11]
