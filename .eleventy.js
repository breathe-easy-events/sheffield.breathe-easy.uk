const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const hashBrown = require("./hash-brown");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(hashBrown);

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
