const Parsel = require("parsel-js");
const { maximumArray, sumArrays, splitBy, updateAt } = require("./util");

const SPECIFICITY_LEVELS = [
  ["id"],
  ["class", "pseudo-class", "attribute"],
  ["type", "pseudo-element"],
];

/**
 * Calculate specificity of a list of selectors.
 *
 * @see https://www.w3.org/TR/selectors-4/#specificity-rules
 *
 * @params {string} String of selector.
 * @returns {[[number, number, number]]} Specificity in format [a, b, c].
 */
function specificity(selector) {
  return splitBy(Parsel.tokenize(selector), isCommaToken).map(
    calculateSpecificity
  );
}

const calculateSpecificity = (tokens) =>
  tokens.reduce(
    (specificity, token) => sumArrays(specificity, getTokenSpecificity(token)),
    [0, 0, 0]
  );

const isCommaToken = (token) => token.type === "comma";

const getSpecificityLevel = (token) =>
  SPECIFICITY_LEVELS.findIndex((level) => level.includes(token.type));

const getTokenSpecificity = (token) => {
  // The specificity of an :is(), :not(), or :has() pseudo-class is replaced by
  // the specificity of the most specific complex selector in its selector list
  // argument.
  if (
    token.type === "pseudo-class" &&
    ["is", "not", "has"].includes(token.name)
  ) {
    return maximumArray(specificity(token.argument));
  }

  // The specificity of a :where() pseudo-class is replaced by zero.
  if (token.type === "pseudo-class" && token.name === "where") {
    return [0, 0, 0];
  }

  // TODO: Handle specificity of argument of nth-child and nth-last-child pseudoclasses.

  return updateAt([0, 0, 0], getSpecificityLevel(token), 1);
};

module.exports = { specificity };
