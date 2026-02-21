import { expect, test } from "vitest";
import { markdownLibrary } from "./markdown-library.ts";

test("custom fyi markdown block renders an aside", () => {
  const expected = `<aside class='fyi stack stack-gap-s'>
<p>this is just a test</p>
</aside>
`;
  const input = `:::[fyi]
this is just a test
:::`;
  const result = markdownLibrary.render(input);
  expect(result).toEqual(expected);
});

test("custom fyi markdown block renders an aside with valid markdown inside", () => {
  const expected = `<aside class='fyi stack stack-gap-s'>
<ul>
<li>this is just a test</li>
<li>this is just a <a href="https://sheffield.breathe-easy.uk">link</a></li>
</ul>
</aside>
`;
  const input = `::: [fyi]
- this is just a test
- this is just a [link](https://sheffield.breathe-easy.uk)
:::`;
  const result = markdownLibrary.render(input);
  expect(result).toEqual(expected);
});

test("custom details markdown block renders summary text and markdown content", () => {
  const expected = `<details class='show'>
<summary>This is the summary text</summary>
<div class='stack stack-gap-s'>
<ul>
<li>this is some markdown</li>
<li>this is more markdown</li>
</ul>
</div>
</details>
`;
  const input = `::: [show] This is the summary text
- this is some markdown
- this is more markdown
:::`;
  const result = markdownLibrary.render(input);
  expect(result).toEqual(expected);
});

test("custom details markdown block renders as part of a fuller markdown document", () => {
  const expected = `<p>this is a paragraph</p>
<details class='show'>
<summary>This is the summary text</summary>
<div class='stack stack-gap-s'>
<ul>
<li>this is some markdown</li>
<li>this is more markdown</li>
</ul>
</div>
</details>
`;
  const input = `this is a paragraph

::: [show] This is the summary text
- this is some markdown
- this is more markdown
:::`;
  const result = markdownLibrary.render(input);
  expect(result).toEqual(expected);
});

test("custom details markdown block renders as part of a fuller markdown document with multiple details", () => {
  const expected = `<p>this is the first paragraph</p>
<details class='show'>
<summary>This is the first summary text</summary>
<div class='stack stack-gap-s'>
<ul>
<li>this is some markdown</li>
<li>this is more markdown</li>
</ul>
</div>
</details>
<p>this is the second paragraph</p>
<details class='show'>
<summary>This is the second summary text</summary>
<div class='stack stack-gap-s'>
<ul>
<li>this is some markdown</li>
<li>this is more markdown</li>
</ul>
</div>
</details>
`;
  const input = `this is the first paragraph

::: [show] This is the first summary text
- this is some markdown
- this is more markdown
:::

this is the second paragraph

::: [show] This is the second summary text
- this is some markdown
- this is more markdown
:::
`;
  const result = markdownLibrary.render(input);
  expect(result).toEqual(expected);
});
