const debounce = require("lodash/debounce");
const { specificity } = require("../lib");
const { maximumArray } = require("../lib/util");

const $input = document.querySelector("#input");
const $results = document.querySelector(".results");

const resultAsHtml = (selector, [a, b, c]) => `<div class="result">
<p>No seletor<code class="selector">${selector}</code>, há...</p>
<ul>
    <li>
        <span class="count">${a}</span>
        <span>ids</span>
    </li>
    <li>
        <span class="count">${b}</span>
        <span>classes, pseudo-classes e atributos</span>
    </li>
    <li>
        <span class="count">${c}</span>
        <span>elementos e pseudo-elementos</span>
    </li>
</ul>
</div>`;

const handleInput = (selector) => {
  $results.innerHTML = resultAsHtml(
    selector,
    maximumArray(specificity(selector))
  );
};

$input.addEventListener(
  "input",
  debounce((e) => handleInput(e.target.value), 500)
);

handleInput($input.value);
