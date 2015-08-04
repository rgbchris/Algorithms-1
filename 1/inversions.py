import math

# with open('IntegerArray.txt', 'r') as f:
# lines = [line.rstrip('\n') for line in open('IntegerArray.txt')]
lines = [6,5,4,3,2,1] # => 15

# len(arr)
def count(arr, n):
  if n == 1:
    return 0
  else:
    print 'Right'
    print int(n/2)
    count(int(n/2))
    print 'Left'
    print (n + 2 // 2) // 2
    count((n + 2 // 2) // 2)
    # x = count(arr[0:int(math.floor(n / 2))], int(n/2))
    # y = count(arr[int(math.floor(n / 2)):len(arr)], (n + 2 // 2) // 2)
    # y = count(arr[], (n + 2 // 2) // 2, int(n/2))
    # y = count
  # return x + y

print count(lines, len(lines))


# roughly 5 billion possible inversions

# for line in lines:
#   print line
