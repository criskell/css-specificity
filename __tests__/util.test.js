const test = require("ava");
const {
  compareArray,
  sumArrays,
  maximum,
  maximumArray,
} = require("../lib/util.js");

test("compareArray: should compare array", (t) => {
  t.deepEqual(compareArray([0, 9, 5], [0, 9, 5]), 0);
  t.deepEqual(compareArray([0, 9], [0, 9]), 0);
  t.deepEqual(compareArray([0, 9, 5], [0, 9, 6]), -1);
  t.deepEqual(compareArray([0, 15, 5], [0, 9, 6]), 1);
  t.deepEqual(compareArray([-20, 15, 5], [0, 9, 6]), -1);
  t.deepEqual(compareArray([-20, 5, 20], [-20, 9, 6]), -1);
});

test("sumArrays: should sum arrays", (t) => {
  t.deepEqual(sumArrays([1, 2, 3], [4, 5, 6]), [5, 7, 9]);
});

test("maximum: should return maximum value in array", (t) => {
  t.deepEqual(
    maximum([1, 2, 100, 3, 5, 1000, 9, 500], (x, y) => x > y),
    1000
  );
});

test("maximumArray: should return maximum array in arrays", (t) => {
  t.deepEqual(
    maximumArray([
      [1, 2, 3],
      [4, 50, 6],
      [7, 10, 8],
      [9, 4, 3],
      [2, 8, 100],
    ]),
    [9, 4, 3]
  );
  t.deepEqual(
    maximumArray([
      [9, 2, 3],
      [4, 50, 6],
      [9, 10, 500],
      [9, 10, 8],
      [9, 10, 3],
      [2, 8, 100],
    ]),
    [9, 10, 500]
  );
});
