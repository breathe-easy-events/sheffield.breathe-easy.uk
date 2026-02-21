import * as MarkdownIt from "markdown-it";
import markdownItAnchor from "markdown-it-anchor";
import { container, MarkdownItContainerOptions } from "@mdit/plugin-container";
import slugify from "slugify";

const linkAfterHeader = markdownItAnchor.permalink.linkAfterHeader({
  class: "anchor",
  symbol:
    '<span aria-hidden="true" class="anchor-icon"><svg width="16" height="16" viewBox="0 0 24 24"><path fill="currentcolor" d="m12.11 15.39-3.88 3.88a2.52 2.52 0 0 1-3.5 0 2.47 2.47 0 0 1 0-3.5l3.88-3.88a1 1 0 0 0-1.42-1.42l-3.88 3.89a4.48 4.48 0 0 0 6.33 6.33l3.89-3.88a1 1 0 1 0-1.42-1.42Zm8.58-12.08a4.49 4.49 0 0 0-6.33 0l-3.89 3.88a1 1 0 0 0 1.42 1.42l3.88-3.88a2.52 2.52 0 0 1 3.5 0 2.47 2.47 0 0 1 0 3.5l-3.88 3.88a1 1 0 1 0 1.42 1.42l3.88-3.89a4.49 4.49 0 0 0 0-6.33ZM8.83 15.17a1 1 0 0 0 1.1.22 1 1 0 0 0 .32-.22l4.92-4.92a1 1 0 0 0-1.42-1.42l-4.92 4.92a1 1 0 0 0 0 1.42Z"></path></svg></span>',
  style: "aria-labelledby",
});
const markdownItAnchorOptions = {
  level: [1, 2, 3, 4, 5, 6],
  slugify: (str) =>
    slugify(str, {
      lower: true,
      strict: true,
      remove: /["]/g,
    }),
  tabIndex: false,
  permalink(slug, opts, state, idx) {
    state.tokens.splice(
      idx,
      0,
      Object.assign(new state.Token("div_open", "div", 1), {
        // Add class "header-wrapper [h1 or h2 or h3]"
        attrs: [["class", `heading-wrapper ${state.tokens[idx].tag}`]],
        block: true,
      }),
    );

    state.tokens.splice(
      idx + 4,
      0,
      Object.assign(new state.Token("div_close", "div", -1), {
        block: true,
      }),
    );

    linkAfterHeader(slug, opts, state, idx + 1);
  },
};

const assideOptions: MarkdownItContainerOptions = {
  name: "[fyi]",
  openRender: (_) => "<aside class='fyi stack stack-gap-s'>\n",
  closeRender: (_) => "</aside>\n",
};

const detailsOptions: MarkdownItContainerOptions = {
  name: "[show]",
  openRender: (tokens, idx) => {
    const summaryText = tokens[idx].info.replace(/^\s*\[show\]\s*/, "");
    return `<details class='show'>
<summary>${summaryText}</summary>
<div class='stack stack-gap-s'>
`;
  },
  closeRender: (_) => "</div>\n</details>\n",
};

export const markdownLibrary = MarkdownIt.default({
  html: true,
  breaks: true,
  linkify: true,
})
  .use(markdownItAnchor, markdownItAnchorOptions)
  .use(container, detailsOptions)
  .use(container, assideOptions);
