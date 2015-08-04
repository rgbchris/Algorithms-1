function fastPower(a, b) {
  if (b == 1) {
    return a;
  } else {
    var c = a*a;
    var ans = fastPower(c, b/2);

    if ((b % 2) > 0) {
      return a * ans;
    } else {
      return ans;
    }
  }
}

// e.g. a = 2, b = 4 -> a^b
console.log(fastPower(2,4));
