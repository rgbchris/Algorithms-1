Heap.prototype = {
    insert: function(node) {
        this.content.push(node);
        this.bubbleUp();
    },
    
    extractMin: function() {
      return this.content.splice(0, -1);  
    },

    bubbleUp: function() {
        var indx, i = this.content.length;
        
        // odd
        if (i % 2 > 0) {
            indx = Math.floor(i / 2) - 1;
        // even
        } else {
            indx = (i / 2) - 1;
        }

        i = i-1;

        if (this.content[i] > this.content[indx]) {
            // swap
            var tmp = this.content[i];
            this.content[i] = this.content[indx];
            this.content[indx] = tmp;
            //recurse
            this.bubbleUp(this.content, indx);
        }
    },

    bubbleDown: function() {

    }
}

function Heap(content) {
    this.content = content || [];
}

var pq = new Heap([4,4,8,9,4,12,9,11,13]);

pq.insert(5);

console.log(pq.content);

// [4,4,5,9,4,8,9,11,13,12]
