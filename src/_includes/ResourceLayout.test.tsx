import { expect, test } from "vitest";
import { decodeHTML } from "entities";
import { renderToStaticMarkup } from "react-dom/server";
import { ResourceLayout } from "./ResourceLayout.11ty";
import { screen } from "@testing-library/dom";

test("render  PageLayout", async () => {
  const content = `
<main>
  <h2>heading 1</h2>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, deleniti.
  </p>
  <h2>heading 2</h2>
  <p>
    lorem, ipsum dolor sit amet consectetur adipisicing elit. eaque, deleniti.
  </p>
  <h3>sub-heading 1</h3>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, deleniti.
  </p>
  <h3>sub-heading 2</h3>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, deleniti.
  </p>
  <h2>heading 3</h2>
  <p>
    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Eaque, deleniti.
  </p>
</main>
	`;
  const viewProps = {
    content,
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

  const result = ResourceLayout(viewProps);
  document.body.innerHTML = decodeHTML(renderToStaticMarkup(result));
  expect(screen.getAllByText(viewProps.title)).to.exist;
  expect(screen.getByText("heading 1")).to.exist;
});
