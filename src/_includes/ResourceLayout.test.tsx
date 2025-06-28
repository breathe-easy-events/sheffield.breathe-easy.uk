import { expect, test } from "vitest";
import { decodeHTML } from "entities";
import { renderToStaticMarkup } from "react-dom/server";
import { ResourceLayout } from "./ResourceLayout.11ty";
import { screen } from "@testing-library/dom";
import { ViewProps } from "../../eleventy";

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

  const result = ResourceLayout(viewProps);
  document.body.innerHTML = decodeHTML(renderToStaticMarkup(result));
  expect(screen.getAllByText(viewProps.title)).to.exist;
  expect(screen.getByText("BODY")).to.exist;
});
