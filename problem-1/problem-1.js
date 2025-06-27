// Problem 1: Three ways to sum to n
var sum_to_n_a = function(n) {
  if (n <= 1) return n;
  let total = 0;
  for (let i = 1; i < n; i += 2) {
    total += i + (i + 1);
  }
  return n % 2 !== 0 ? total + n : total;
};

var sum_to_n_b = function(n) {
  if (n <= 1) return n;
  return (n * (n + 1)) / 2;
};

var sum_to_n_c = function(n) {
  if (n <= 1) return n;
  return n + sum_to_n_c(n - 1);
};

module.exports = { sum_to_n_a, sum_to_n_b, sum_to_n_c };
