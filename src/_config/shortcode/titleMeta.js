module.exports = (eleventyConfig, _) => {
  eleventyConfig.addShortcode("titleMeta", (title, page, fallback) => {
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
