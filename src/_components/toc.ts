// const cheerio = require('cheerio');
import { Window } from "happy-dom";

const dom = (content: string) => {
  const window = new Window();
  const document = window.document;
  document.body.innerHTML = content;
  return document;
};

// reverse the DOM wrapping above before writing the file
const content = (dom: Document): string => dom.body.innerHTML;

/** Attribute which if found on a heading means the heading is excluded */
const ignoreAttribute = "data-toc-exclude";

const defaults = {
  tags: ["h2", "h3", "h4"],
  ignoredElements: [],
  wrapper: "nav",
  wrapperClass: "toc",
  headingText: "",
  headingTag: "h2",
};

export const toc = (content: string): string => {
  const window = new Window();
  const document = window.document;
  document.body.innerHTML = content;
  const hdom = dom(content);
  const doToc =
    (depth: number) =>
    (content_: HTMLElement): HTMLElement => {
      const mempty = document.createTextNode("");
      if (depth > 5) {
        return mempty;
      } else {
        const list = document.createElement("ol");
        const headings = content_.querySelectorAll(`h${depth}[id]`);
        const lis = [...headings].map((h) => {
          const li = document.createElement("li");
          const link = document.createElement("a");
          link.innerText = h.innerText;
          link.href = h.getAttribute("id");
          const toc_ = doToc(depth + 1)(h); // I'm silly the h3 is not a child of h2
          li.append(link, toc_);
          return li;
        });
        if (lis.length === 0) {
          return mempty;
        } else {
          list.append(...lis);
          return list;
        }
      }
    };
  const nav = document.createElement("nav");
  nav.appendChild(doToc(2)(hdom.body));
  return nav.outerHTML;
};
