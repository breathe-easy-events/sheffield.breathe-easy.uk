const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const hashAssets = require("./src/_config/hash-assets");
const bundleJS = require("./src/_config/bundle-javascript");
const bundleJavascript = require("./src/_config/bundle-javascript");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(bundleJavascript, { dirname: __dirname });
  eleventyConfig.addPlugin(hashAssets, { dirname: __dirname });
  return {
    dir: {
      input: "src",
      output: "dist",
    },
    htmlTemplateEngine: "njk",
    markdownTemplateEngine: "njk",
  };
};
