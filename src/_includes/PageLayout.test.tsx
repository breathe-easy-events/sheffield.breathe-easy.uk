import { expect, test } from "vitest";
import { decodeHTML } from "entities";
import { renderToStaticMarkup } from "react-dom/server";
import { PageLayout } from "./PageLayout.11ty";
import { screen } from "@testing-library/dom";

test("render  PageLayout", async () => {
  const viewProps = {
    content: "<p>This is the <em>BODY</em></p>",
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
  };

  const result = PageLayout(viewProps);
  document.body.innerHTML = decodeHTML(renderToStaticMarkup(result));
  expect(screen.getAllByText(viewProps.title)).to.exist;
  expect(screen.getByText("BODY")).to.exist;
});
