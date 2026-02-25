import { expect, test } from "vitest";
import { decodeHTML } from "entities";
import { renderToStaticMarkup } from "react-dom/server";
import { IndexLayout } from "./IndexLayout.11ty";
import { screen } from "@testing-library/dom";

test("render IndexLayout", async () => {
  const viewProps = {
    content: "<p>This is the <em>BODY</em></p>",
    eleventy: { generator: "elventy" },
    title: "My site",
    page: { url: "/" },
    baseUrl: "",
    collections: {
      menu: [
        {
          data: { title: "About" },
          url: "/about",
        },
      ],
    },
    links: { links: [] },
  };

  const result = IndexLayout(viewProps);
  document.body.innerHTML = decodeHTML(renderToStaticMarkup(result));
  expect(screen.getAllByText(viewProps.title)).to.exist;
  expect(screen.getByText("BODY")).to.exist;
});
