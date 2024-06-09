const assetHash = require("asset-hash");
const { Window } = require("happy-dom");
const fs = require("fs");

console.log("IMPORT HASHBROWN 🥔");

const dom = (content) => {
  const window = new Window();
  const document = window.document;
  document.body.innerHTML = content;
  return document;
};

const content = (dom) => dom.documentElement.outerHTML;

const hashEl = async (el, attr, outputDir) => {
  console.log("💜 attrubite name - " + el[attr]);
  return await assetHash
    // need to do some link sanatizing
    // this fails if the plugin that processes my scss -> css doesn't beat it to this point
    //  it's also not getting consistant hashs on the content??? which means it's not very usefull
    //
    // A bit of digging and there's a second config phase for plugins so all the personal config stuff will run first
    // https://www.11ty.dev/docs/transforms/#plugins
    //
    // So I guess the next step is to move this into a plugin and pop it at the bottom of the config
    // I was thinking a plugin would be easier for testing but I also need to test the interaction with
    // a project, hmmmm

    .getHashedName(__dirname + outputDir + el[attr])
    .then((name) => {
      // TODO can I check if eleventy set to --quiet ? and not log
      console.log("🧡 HASH - " + name);
      const filePath = el[attr];
      const link = filePath.split("/").slice(0, -1).concat(name).join("/");
      // what happens if you try to rename a file to one that allready exists?
      // docs say it will be overwritten
      // fs.renameSync(
      //   __dirname + outputDir + filePath,
      //   __dirname + outputDir + link,
      // );
      fs.copyFileSync(
        __dirname + outputDir + filePath,
        __dirname + outputDir + link,
      );
      el[attr] = link;
      return name;
    })
    .catch((err) => console.log(err));
};

module.exports = function (eleventyConfig, pluginOptions = {}) {
  eleventyConfig.on(
    "eleventy.after",
    async ({ dir, results, runMode, outputMode }) => {
      // Run me after the build ends
      // console.log({ dir, results, runMode, outputMode });

      /**
				{
					"dir": {
						"input": "src",
						"includes": "_includes",
						"data": "_data",
						"output": "dist"
					},
					"results": [
						{
							"inputPath": "./src/css/styles.scss",
							"outputPath": "dist/css/styles.css",
							"url": "/css/styles.css",
							"content": "String or Buffer"
						}
					],
					"runMode": "serve",
					"outputMode": "fs"
				}
			 */

      // TODO
      // grab the results
      // filter for html files
      // filter for links to hash
      // get all links to hash in each result obj
      //   maybe make a cache of already processed assets so I can just update the link
      // copy asset to file with hash in name
      // update link in dom
      // replace content with stringified dom
      // overwrite html file with new content
      results
        .filter(({ outputPath }) => outputPath.includes("html"))
        .map((res) => ({ ...res, dom: dom(res.content) }))
        .forEach((res) => {
          console.log(Object.keys(res));
        });
    },
  );
  console.log(pluginOptions);
  const SELECTOR = pluginOptions.selector || "[data-asset-hash]";
  // just going to dump this in config, consider extracting to seperate file or making a plugin if it works well
  eleventyConfig.addTransform("asset-hash", async function (content) {
    const document = dom(content);
    const linksToHash = [...document.querySelectorAll(SELECTOR)];
    if (linksToHash.length == 0) {
      // no changes to make.
      return content;
    } else {
      const outputDir = "/" + this.page.outputPath.split("/")[0];
      for (let el of linksToHash) {
        switch (el.tagName) {
          case "LINK":
            await hashEl(el, "href", outputDir);
            break;

          case "SCRIPT":
            await hashEl(el, "src", outputDir);
            break;
          default:
            break;
        }
      }
      return document.documentElement.outerHTML;
    }
  });
};
