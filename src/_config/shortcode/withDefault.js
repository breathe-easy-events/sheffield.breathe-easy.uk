module.exports = (eleventyConfig, _) => {
  eleventyConfig.addShortcode(
    "withDefault",
    (maybe, fallback = "") => maybe || fallback,
  );
};
