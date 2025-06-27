const { sum_to_n_a, sum_to_n_b, sum_to_n_c } = require('./problem-1');

function testSum() {
  const testInput = 1000;
  let passedA = 0;
  let passedB = 0;
  let passedC = 0;
  let expected = 0;

  for (let i = 1; i <= testInput; i++) {
    expected += i;
    const resultA = sum_to_n_a(i);
    const resultB = sum_to_n_b(i);
    const resultC = sum_to_n_c(i);
    console.log(`sum(${i}) === ${expected}; A: ${resultA === expected}, B: ${resultB === expected}, C: ${resultC === expected}`);
    if (resultA === expected) passedA++;
    if (resultB === expected) passedB++;
    if (resultC === expected) passedC++;
  }

  console.log(`\n${testInput} test cases: A: ${passedA}, B: ${passedB}, C: ${passedC}`);
}

testSum();
