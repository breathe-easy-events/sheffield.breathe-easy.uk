import { expect, test } from "vitest";
import { HeadSchema, headDefaultProps, ViewSchema } from "./eleventy";

// ViewSchema Tests

const viewData = {
  content: `<p>😷 Many people are still worried about the risks of attending
in-person events, especially people who are clinically vulnerable to
covid-19 and other infectious diseases.</p>
<p>🌤️ Breathe Easy Sheffield is a new eclectic series of social and
cultural events, designed with enhanced safety measures in place to
reduce transmission risk.</p>
<p>👉 Want to find out more? <a href="http://eepurl.com/iQfyS2">Register your interest</a></p>
<p><em>This site is under construction as of June 2024</em></p>`,
  page: {
    url: "/",
  },
  title: "snazzy website",
  eleventy: { generator: "elventy" },
  links: [
    {
      text: "How-to guide for Covid-safer events",
      url: "https://sheffield.breathe-easy.uk/how-to-guide-for-covid-safer-events",
    },
    {
      text: "Borrow a purifier",
      url: "https://sheffield.breathe-easy.uk/lending-library",
    },
  ],
};

test("ViewSchema has title, content, currentPage, links", async () => {
  const data = viewData;

  const result = ViewSchema.parse(data);

  expect(result.content).toEqual(data.content);
  expect(result.currentUrl).toEqual(data.page.url);
  expect(result.title).toEqual(data.title);
  expect(result.links).toEqual(data.links);
  expect(result.links.length).toEqual(2);
});

test("ViewSchema has an empty link array by default", async () => {
  const data = viewData;

  const result = ViewSchema.parse(data);

  expect(result.menu).toEqual([]);
});

test("ViewSchema converts menu collection to useful menu objects array", async () => {
  const data = {
    ...viewData,
    collections: {
      menu: [
        { data: { title: "home" }, url: "/" },
        { data: { title: "about" }, url: "/about" },
      ],
    },
  };

  const result = ViewSchema.parse(data);

  expect(result.menu).toEqual([
    { title: "home", url: "/" },
    { title: "about", url: "/about" },
  ]);
});

// HeadSchema Tests

test("home page title is the same as title prop", async () => {
  const data = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    page: { url: "/" },
    eleventy: { generator: "elventy" },
  };

  const result = HeadSchema.parse(data);

  expect(result.title).toEqual(data.title);
});

test("pages other than home have a default valye prepended to the title prop", async () => {
  const data = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    page: { url: "/about" },
    eleventy: { generator: "elventy" },
  };

  const result = HeadSchema.parse(data);

  expect(result.title).toEqual(`Breathe Easy Sheffield | ${data.title}`);
});

test("default social image is present", async () => {
  const data = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    page: { url: "/about" },
    eleventy: { generator: "elventy" },
  };

  const result = HeadSchema.parse(data);

  expect(result.socialImage).toEqual(
    data.baseUrl + headDefaultProps.socialImage,
  );
  expect(result.socialImageAlt).toEqual(headDefaultProps.socialImageAlt);
});

test("social image with no alt text uses default values", async () => {
  const data = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    page: { url: "/about" },
    socialImage: "https://images.unsplash.com/photo-1516434233442-0c69c369b66d",
    eleventy: { generator: "elventy" },
  };

  const result = HeadSchema.parse(data);

  expect(result.socialImage).toEqual(
    data.baseUrl + headDefaultProps.socialImage,
  );
  expect(result.socialImageAlt).toEqual(headDefaultProps.socialImageAlt);
});

test("social image with alt text uses a custom image", async () => {
  const data = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    page: { url: "/about" },
    socialImage: "https://images.unsplash.com/photo-1516434233442-0c69c369b66d",
    socialImageAlt: "A lovely flock of birds",
    eleventy: { generator: "elventy" },
  };

  const result = HeadSchema.parse(data);

  expect(result.socialImage).toEqual(data.socialImage);
  expect(result.socialImageAlt).toEqual(data.socialImageAlt);
});

test("social image alt text doesn't overwrite default alt text if no image supplied", async () => {
  const data = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    page: { url: "/about" },
    socialImageAlt: "A lovely flock of birds",
    eleventy: { generator: "elventy" },
  };

  const result = HeadSchema.parse(data);

  expect(result.socialImage).toEqual(
    data.baseUrl + headDefaultProps.socialImage,
  );
  expect(result.socialImageAlt).toEqual(headDefaultProps.socialImageAlt);
});

test("missing baseUrl is safe", async () => {
  const data = {
    title: "snazzy website",
    page: { url: "/about" },
    eleventy: { generator: "elventy" },
  };

  const result = HeadSchema.parse(data);

  expect(result.url).toEqual(data.page.url);
});

test("providing a baseUrl creates a complete url", async () => {
  const data = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    page: { url: "/about" },
    eleventy: { generator: "elventy" },
  };

  const result = HeadSchema.parse(data);

  expect(result.url).toEqual(data.baseUrl + data.page.url);
});

test("default description is used if none provided", async () => {
  const data = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    page: { url: "/about" },
    eleventy: { generator: "elventy" },
  };

  const result = HeadSchema.parse(data);

  expect(result.description).toEqual(headDefaultProps.description);
});

test("provided description is used if provided", async () => {
  const data = {
    description: "a snazzy website",
    baseUrl: "https://example.com",
    title: "snazzy website",
    page: { url: "/about" },
    eleventy: { generator: "elventy" },
  };

  const result = HeadSchema.parse(data);

  expect(result.description).toEqual(data.description);
});
