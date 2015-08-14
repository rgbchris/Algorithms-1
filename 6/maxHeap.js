MaxHeap.prototype = {
    insert: function(node) {
        this.content.push(node);
        this.bubbleUp();
    },

    extractMax: function() {
        var max = this.content[0];
        this.bubbleDown();
        return max;
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
            if (this.content[i] > this.content[indx] && !stop) {
                stop = indx;
            }
        }, this);

        var last;
        // start swapping to restore heap property
        parentNodeIndices.reverse().forEach(function(indx, currentItr) {
            if (indx > stop || !stop) return;
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
        
        if (this.content.length === 2) {
            if (this.content[0] > this.content[1]) {
                return;
            } else {
                swap(0, 1);
                return;
            }
        }
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
            var leftChild = (indx*2 + 1);
            var rightChild = (indx*2 + 2);
            if (!this.content[leftChild]) break;
            var indx = this.content[leftChild] > this.content[rightChild] ? leftChild : rightChild;
            smallestChildIndices.push(indx);
            lvl++;
        }

        var last = 0;
        smallestChildIndices.forEach(function(indx) {
            if (this.content[indx] > this.content[last]) {
                swap.call(this, indx, last);
            }
            last = indx;
        }, this);
    }
}

function MaxHeap(content) {
    this.content = content || [];
}

module.exports = MaxHeap;
