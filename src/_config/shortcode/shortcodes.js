const section = require("./section");
const titleMeta = require("./titleMeta");
const withDefault = require("./withDefault");

module.exports = (eleventyConfig, _) => {
  eleventyConfig.addPlugin(section);
  eleventyConfig.addPlugin(titleMeta);
  eleventyConfig.addPlugin(withDefault);
};
