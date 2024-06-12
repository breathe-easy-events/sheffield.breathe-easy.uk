const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const hashAssets = require("./src/_config/hash-assets");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventySass);
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
