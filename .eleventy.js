const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const hashAssets = require("./src/_config/hash-assets");
const absoluteUrl = require("./src/_config/filter/absoluteUrl");
const withDefault = require("./src/_config/shortcode/withDefault");
const titleMeta = require("./src/_config/shortcode/titleMeta");

module.exports = function (eleventyConfig) {
  // templates and processing files
  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(hashAssets, { dirname: __dirname });

  // data
  eleventyConfig.addGlobalData("baseUrl", process.env.BASE_URL || "");

  // filters
  eleventyConfig.addPlugin(absoluteUrl);

  // shortcodes
  eleventyConfig.addPlugin(withDefault);
  eleventyConfig.addPlugin(titleMeta);

  return {
    dir: {
      input: "src",
      output: "dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
