import CSSwhat from "css-what";

/**
 * Calculate specificity of a list of selectors.
 *
 * @see https://www.w3.org/TR/selectors-4/#specificity-rules
 *
 * @params {string} String of selector.
 * @returns {[[number, number, number]]} Specificity in format [a, b, c].
 */
export default function (selector) {
  return CSSwhat.parse(selector).map(specificity);
}

function specificity(tokens) {
  return tokens.reduce(
    (specificity, token) => {
      const level = getSpecificityLevel(token);

      if (level >= 0) specificity[level]++;

      return specificity;
    },
    [0, 0, 0]
  );
}

function getSpecificityLevel(token) {
  const isIdentifier =
    token.type === "attribute" &&
    token.name === "id" &&
    token.action === "equals";

  const isClass =
    token.type === "attribute" &&
    token.name === "class" &&
    token.action === "element";

  const isPseudoclass = token.type === "pseudo";
  const isAttribute = token.type === "attribute" && !isIdentifier && !isClass;
  const isElement = token.type === "tag";
  const isPseudoElement = token.type === "pseudo-element";

  if (isIdentifier) return 0;
  if (isClass || isPseudoclass || isAttribute) return 1;
  if (isElement || isPseudoElement) return 2;

  return -1;
}
