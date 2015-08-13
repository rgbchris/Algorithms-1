var list = [
  5400,
   2138,
   1344,
   5484,
   5048,
   4338,
   5078,
   7733,
   1692,
   9052,
   1779,
   8086,
   8299,
   6601,
   1115,
    735,
   3031,
    978,
    880,
   2132];

(function() {

    var minHeap = [];
    var maxHeap = [];
    var medians = [];

    list.forEach(function(k, i) {
      // second pass
      if (i === 1) {
          medians.push((list[0] + k) / 2)
          return;
      }

      // first pass
      if (i === 0) {
        medians.push(k);

        if (k < list[(i+1)]) {
          maxHeap.push(k);
          minHeap.push(list[(i+1)])
        } else {
          maxHeap.push(list[(i+1)])
          minHeap.push(k);
        }
      } else {

          if (k < maxHeap[0]) {
            maxHeap.push(k);
            bubbleUp(maxHeap, maxHeap.length, 'max');
          } else {
            minHeap.push(k);
            bubbleUp(minHeap, minHeap.length, 'min');
          }

          checkBalance();
          medians.push(getMedian());


      }

      // odd
      // if (k % 2 > 0) {
      // // even
      // } else {
      // }
    });

    var result = medians.reduce(function(prev, cur, index, array) {
        return prev + cur;
    });

    console.log(result % 20);

    function bubbleUp(heap, i, type) {
        var indx;
        // odd
        if (i % 2 > 0) {
            indx = Math.floor(i / 2) - 1;
        // even
        } else {
            indx = (i / 2) - 1;
        }

        if (type === 'max') {
            // if there is an imbalance
            if (heap[i] > heap[indx]) {
                // swap
                var tmp = heap[i];
                heap[i] = heap[indx];
                heap[indx] = tmp;
                //recurse
                bubbleUp(heap, indx, 'max');
            }
        }
        if (type === 'min') {
            // if there is an imbalance
            if (heap[i] < heap[indx]) {
                // swap
                var tmp = heap[i];
                heap[i] = heap[indx];
                heap[indx] = tmp;
                //recurse
                bubbleUp(heap, indx, 'min');
            }
        }
    }

    function bubbleDown(heap, i, type) {
        heap.unshift(foo.splice(-1)[0]);

        var indx = (i * 2) - 1;

        if (type === 'max') {
            // if there is an imbalance
            if (heap[i] < heap[indx]) {
                // swap
                var tmp = heap[i];
                heap[i] = heap[indx];
                heap[indx] = tmp;
                //recurse
                bubbleDown(heap, indx, 'max');
            }
        }
        if (type === 'min') {
            // if there is an imbalance
            if (heap[i] > heap[indx]) {
                // swap
                var tmp = heap[i];
                heap[i] = heap[indx];
                heap[indx] = tmp;
                //recurse
                bubbleDown(heap, indx, 'min');
            }
        }

    }
    
    function checkBalance() {
        // If heaps are equal return
        if (minHeap.length === maxHeap.length) return;

        // Is any heap more than one node larger than the other?
        if (Math.abs(minHeap.length - maxHeap.length) > 1) {
            // Check which heap is larger and transfer
            if (minHeap.length > maxHeap.length) {
                maxHeap.push(minHeap.splice(0,1)[0]);
                bubbleDown(minHeap, 1, 'min');
                bubbleUp(maxHeap, maxHeap.length, 'max');
            } else {
                minHeap.push(maxHeap.splice(0,1)[0]);
                bubbleDown(maxHeap, 1, 'max');
                bubbleUp(minHeap, minHeap.length, 'min');
            }
        }
    }

    function getMedian() {
      // If even calculate median and return
      if (minHeap.length === maxHeap.length) {
        return (maxHeap[0] + minHeap[0]) / 2
      } else {
        // else take root of tree with more values
        if (minHeap.length > maxHeap.length) {
          return minHeap[0];
        } else {
          return maxHeap[0];
        }
      }
    }

})();

