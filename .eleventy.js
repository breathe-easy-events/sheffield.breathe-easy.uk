const eleventySass = require("@11tyrocks/eleventy-plugin-sass-lightningcss");
const assetHash = require("asset-hash");
const { Window } = require("happy-dom");

const dom = (content) => {
  const window = new Window();
  const document = window.document;
  document.body.innerHTML = content;
  return document;
};

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(eleventySass);

  // just going to dump this in config, consider extracting to seperate file or making a plugin if it works well
  eleventyConfig.addTransform("asset-hash", async function (content) {
    const document = dom(content);
    const linksToHash = [...document.querySelectorAll("#asset-hash")];
    if (linksToHash.length == 0) {
      // no changes to make.
      return content;
    } else {
      const outputDir = this.page.outputPath.split("/")[0];
      console.log(outputDir);
      linksToHash.forEach((el) => {
        switch (el.tagName) {
          case "LINK":
            console.log("LINKINKINKNINKNIK");
            console.log(el.href);
            el.href = el.href + `?${Date.now()}`;
            break;

          case "SCRIPT":
            console.log("SCRIPTTTTTT");
            console.log(el.src);
            el.src = el.src + `?${Date.now()}`;
            break;
          default:
            break;
        }
      });
      return document.documentElement.outerHTML;
    }
  });

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
};
