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
const specificity = (selector) =>
  selector == ""
    ? []
    : splitBy(Parsel.tokenize(selector), isCommaToken).map(
        calculateTokensSpecificity
      );

const calculateTokensSpecificity = (tokens) =>
  tokens.reduce(
    (specificity, token) =>
      canIgnoreToken(token)
        ? specificity
        : sumArrays(specificity, getTokenSpecificity(token)),
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

  // TODO: Handle specificity of argument of nth-child and nth-last-child pseudoclasses.

  return updateAt([0, 0, 0], getSpecificityLevel(token), 1);
};

const canIgnoreToken = (token) => {
  return (
    (token.type === "type" && token.content === "*") ||
    (token.type === "pseudo-class" && token.name === "where")
  );
};

module.exports = { specificity, calculateTokensSpecificity };
