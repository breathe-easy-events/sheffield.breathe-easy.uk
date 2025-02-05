import { expect, test } from "vitest";
import { HeadSchema, headDefaultProps } from "./eleventy";

test("home page title is the same as title prop", async () => {
  const data = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    page: { url: "/" },
  };

  const result = HeadSchema.parse(data);

  expect(result.title).toEqual(data.title);
});

test("pages other than home have a default valye prepended to the title prop", async () => {
  const data = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    page: { url: "/about" },
  };

  const result = HeadSchema.parse(data);

  expect(result.title).toEqual(`Breathe Easy Sheffield | ${data.title}`);
});

test("default social image is present", async () => {
  const data = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    page: { url: "/about" },
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
  };

  const result = HeadSchema.parse(data);

  expect(result.url).toEqual(data.page.url);
});

test("providing a baseUrl creates a complete url", async () => {
  const data = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    page: { url: "/about" },
  };

  const result = HeadSchema.parse(data);

  expect(result.url).toEqual(data.baseUrl + data.page.url);
});

test("default description is used if none provided", async () => {
  const data = {
    baseUrl: "https://example.com",
    title: "snazzy website",
    page: { url: "/about" },
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
  };

  const result = HeadSchema.parse(data);

  expect(result.description).toEqual(data.description);
});
