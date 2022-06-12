/**
 * Split a array by a predicate into a array of groups.
 */
const splitBy = (array, predicate) => {
  const groups = [[]];

  for (const element of array) {
    if (predicate(element)) {
      groups.push([]);
    } else {
      groups[groups.length - 1].push(element);
    }
  }

  return groups;
};

/**
 * Compare two numbers.
 */
const compareNumber = (x, y) => Math.sign(x - y);

/**
 * Compare two arrays of same length.
 */
const compareArray = (xs, ys) => {
  return (
    xs
      .map((x, idx) => compareNumber(x, ys[idx]))
      .find((comparation) => comparation !== 0) || 0
  );
};

/**
 * Sum arrays.
 */
const sumArrays = (xs, ys) => xs.map((x, idx) => x + ys[idx]);

/**
 * Return maximum value into array using a comparation function.
 */
const maximum = (xs, compareFn) =>
  xs.reduce((maximum, value) => (compareFn(value, maximum) ? value : maximum));

/**
 * Return maximum array.
 */
const maximumArray = (arrays) =>
  maximum(
    arrays,
    (array, maximumArray) => compareArray(array, maximumArray) === 1
  );

/**
 * Update a element at a index.
 */
const updateAt = (array, idx, value) =>
  idx >= 0 ? Object.assign(array, { [idx]: value }) : array;

module.exports = {
  splitBy,
  compareArray,
  sumArrays,
  maximum,
  maximumArray,
  updateAt,
};
