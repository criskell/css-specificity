import test from "ava";

import specificity from "../lib/index.js";

test("should calculate selector specificity", (t) => {
  t.deepEqual(
    specificity(
      "a b c d e f#b#c#d [a] [b=x] [c=a] #a #b > y.foo.bar.baz.faz:hover > a.link::first-letter"
    ),
    [[5, 9, 9]]
  );
});
