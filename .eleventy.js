const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const hashBrown = require("./hash-brown");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventySass);
  eleventyConfig.addPlugin(hashBrown);
  eleventyConfig.on(
    "eleventy.after",
    async ({ dir, results, runMode, outputMode }) => {
      // Run me after the build ends
      console.log(dir, results, runMode, outputMode);
    },
  );

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
