import pluginTOC from "eleventy-plugin-nesting-toc";

const options = {
  tags: ["h2", "h3", "h4"], // Which heading tags are selected (headings must each have an ID attribute)
  ignoredElements: [], // Elements to ignore when constructing the label for every header (useful for ignoring permalinks, must be selectors)
  wrapper: "nav", // Element to put around the root `ol`
  wrapperClass: "toc", // Class for the element around the root `ol`
  headingText: "", // Optional text to show in heading above the wrapper element
  headingTag: "h2", // Heading tag when showing heading above the wrapper element
};

export const toc = (eleventyConfig: any) => {
  eleventyConfig.addPlugin(pluginTOC, options);
};
