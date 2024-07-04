const withDefault = require("./withDefault");
const titleMeta = require("./titleMeta");

module.exports = (eleventyConfig, _) => {
  eleventyConfig.addPlugin(withDefault);
  eleventyConfig.addPlugin(titleMeta);
};
