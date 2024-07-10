const bundleJavascript = require("./src/_config/bundle-javascript");
const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const filters = require("./src/_config/filter/filters");
const hashAssets = require("./src/_config/hash-assets");
const shortcodes = require("./src/_config/shortcode/shortcodes");

module.exports = function (eleventyConfig) {
  // templates and processing files
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(bundleJavascript, {
    entryPoint: "./src/js/index.ts",
    ts: true,
  });
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
