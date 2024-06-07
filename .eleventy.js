const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addFilter("breakCache", (value) => `${value}?${Date.now()}`);
  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
