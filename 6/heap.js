function swap(i1, i2) {
  var tmp = this.content[i1];
  this.content[i1] = this.content[i2];
  this.content[i2] = tmp;
}

function getParentIndx(i) {
  if (!i) return null;
  return Math.floor((i-1)/2);
}

function earlyReturnTest() {
  if (this.content.length === 2) {
    if (this.compare(this.content[0], this.content[1])) {
      return;
    } else {
      swap.call(this, 0, 1);
      return;
    }
  }
}

Heap.prototype = {
    insert: function(node) {
      this.content.push(node);
      this.bubbleUp();
      return this.content;
    },

    // Will be min or max depending on heap type
    extract: function() {
      var max = this.content[0];
      this.bubbleDown();
      return max;
    },

    compare: function(a,b) {
      // min vs max heap comparisons
      return this.type === 'min' ? a < b : a > b;
    },

    /**
     * Run until heap property is restored.
     * At every node x, key[x] <= all of x's children
     */
    bubbleUp: function() {
        earlyReturnTest.call(this, null);

        var i = this.content.length - 1;
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
            if (this.compare(this.content[i], this.content[indx]) && stop === undefined) {
                stop = indx;
            }
        }, this);

        var last;
        // start swapping to restore heap property
        if (stop !== undefined) {
          parentNodeIndices.reverse().forEach(function(indx, currentItr) {
            if (indx < stop) return;
            currentItr === 0 ? swap.call(this, i, indx) : swap.call(this, last, indx);
            last = indx;
          }, this);
        }

    },

    bubbleDown: function() {
        // Delete root
        this.content.splice(0,1);
        
        earlyReturnTest.call(this, null);

        this.content.unshift(this.content.splice(-1)[0])

        var indx = 0;
        var lvl = 0;
        var smallestChildIndices = [];
        while (indx < this.content.length-1) {
            var leftChild  = (indx*2 + 1);
            var rightChild = (indx*2 + 2);
            if (!this.content[leftChild]) break;
            var indx = this.compare(this.content[leftChild], this.content[rightChild]) ? leftChild : rightChild;
            smallestChildIndices.push(indx);
            lvl++;
        }

        var last = 0;
        while (smallestChildIndices.length) {
          smallestChildIndices.forEach(function(indx) {
              if (this.compare(this.content[indx], this.content[last])) {
                  swap.call(this, indx, last);
              }
              last = indx;
          }, this);
          last = 0;
          smallestChildIndices.pop();
        }
    }
}

function Heap(content, type) {
  this.content = content || [];
  this.type = type || 'min';
}

module.exports = Heap;
