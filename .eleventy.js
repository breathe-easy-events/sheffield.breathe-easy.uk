const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const hashAssets = require("./src/_config/hash-assets");
const filters = require("./src/_config/filter/filters");
const shortcodes = require("./src/_config/shortcode/shortcodes");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("src/static");
  // templates and processing files
  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(hashAssets, { dirname: __dirname });

  // data
  eleventyConfig.addGlobalData("baseUrl", process.env.BASE_URL || "");

  // filters
  eleventyConfig.addPlugin(filters);

  // shortcodes
  eleventyConfig.addPlugin(shortcodes);

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
