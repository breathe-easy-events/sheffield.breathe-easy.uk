import { expect, test } from "vitest";
// import { jsxToString } from "jsx-async-runtime";
import { renderToStaticMarkup } from "react-dom/server";
import { IndexLayout } from "./IndexLayout.11ty";
import { screen } from "@testing-library/dom";
import { ViewInput } from "../../eleventy";

test("render IndexLayout", async () => {
  const viewProps: ViewInput = {
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

  const result = IndexLayout(viewProps);
  document.body.innerHTML = await renderToStaticMarkup(result);
  expect(screen.getAllByText(viewProps.title)).to.exist;
  expect(screen.getByText("BODY")).to.exist;
});
