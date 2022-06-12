const test = require("ava");
const { specificity } = require("../lib");

test("specificity: should calculate selector specificity", (t) => {
  t.deepEqual(
    specificity(
      "[x=','], b, #example > [id=example] + a ~ .foo[class=x][data-k][id=x]:hover div#a#b#c span div.hello.bar:active:visited [data-x][data-y]::first-line, #a#b#c:not(.p .k, span#a#b.a, #hello)#d#e"
    ),
    [
      [0, 1, 0],
      [0, 0, 1],
      [4, 12, 5],
      [7, 1, 1],
    ]
  );
});
