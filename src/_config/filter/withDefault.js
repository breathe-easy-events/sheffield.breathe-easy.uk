module.exports = (eleventyConfig, _) => {
  eleventyConfig.addFilter(
    "withDefault",
    (maybe, fallback = "") => maybe || fallback,
  );
};
