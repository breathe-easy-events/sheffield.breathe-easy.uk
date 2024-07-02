module.exports = (eleventyConfig, _) => {
  eleventyConfig.addFilter(
    "absoluteUrl",
    function (url, base = eleventyConfig.globalData.baseUrl) {
      if (base) {
        try {
          return new URL(url, base).href;
        } catch (err) {
          console.error(err);
          return url;
        }
      } else {
        return url;
      }
    },
  );
};
