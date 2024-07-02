module.exports = (eleventyConfig, _) => {
  eleventyConfig.addShortcode("titleMeta", (title, page, fallback) => {
    console.log("🔴🔴🔴🔴🔴🔴🔴🔴🔴");
    console.log(title);
    console.log(fallback);
    console.log("🔴🔴🔴🔴🔴🔴🔴🔴🔴");
    if (page.url === "/") {
      return title || fallback;
    } else {
      if (title) {
        return `${fallback} | ${title}`;
      } else {
        return fallback;
      }
    }
  });
};
