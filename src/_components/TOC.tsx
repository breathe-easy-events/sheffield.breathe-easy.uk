// const cheerio = require('cheerio');
// import { Window } from "happy-dom";
import { JSX } from "react/jsx-runtime";
import { Tree, HappyDom } from "../_utils/utils";
import * as Belt from "@mobily/ts-belt";

/** Attribute which if found on a heading means the heading is excluded */
const ignoreAttribute = "data-toc-exclude";

const defaults = {
  tags: [
    "h2",
    "h3",
    // "h4",
    // "h5",
  ],
  ignoredElements: [],
  wrapper: "nav",
  wrapperClass: "toc",
  headingText: "",
  headingTag: "h2",
};

const toLevel = (tagName: string): number => {
  return Number(tagName.replaceAll("H", ""));
};

const shouldBeChild = (a: Element, b: Element): boolean =>
  toLevel(a.tagName) < toLevel(b.tagName);

const doToc = (aom: Tree.Tree<Element>): JSX.Element => {
  switch (aom._tag) {
    case "Root":
      return (
        <nav>
          <ul>{aom.children.map(doToc)}</ul>
        </nav>
      );
    case "Node":
      switch (aom.children.length) {
        case 0:
          return (
            <li>
              <a href={`#${aom.a.id}`}>{aom.a.textContent}</a>{" "}
            </li>
          );
        default:
          return (
            <li>
              <details>
                <summary>{aom.a.textContent}</summary>
                <ul>
                  <li>
                    <a href={`#${aom.a.id}`}>Introduction</a>
                  </li>
                  {aom.children.map(doToc)}
                </ul>
              </details>
            </li>
          );
      }
  }
};

export const TOC = (content: string): JSX.Element => {
  const hdom = HappyDom.dom(content);
  const result = Belt.pipe(
    defaults.tags,
    (ts) => ts.map((s) => `${s}[id]`).join(","),
    (q) => hdom.querySelectorAll(q),
    (hs) => hs.filter((h) => !h.hasAttribute(ignoreAttribute)),
    (hs) => Tree.fromArray(shouldBeChild)(hs),
    (tree) => doToc(tree),
  );
  return result;
};
