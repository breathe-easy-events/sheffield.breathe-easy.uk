const absoluteUrl = require("./absoluteUrl");
module.exports = (eleventyConfig, _) => {
  eleventyConfig.addPlugin(absoluteUrl);
};
