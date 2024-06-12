const assetHash = require("asset-hash");
const { Window } = require("happy-dom");
const fs = require("fs");

console.log("IMPORT HASHBROWN 🥔");

const memoize = (func) => {
  const cache = {};
  return (...args) => {
    const key = JSON.stringify(args);
    if (cache[key]) {
      return cache[key];
    } else {
      const val = func.apply(null, args);
      cache[key] = val;
      return val;
    }
  };
};

const dom = (content) => {
  const window = new Window();
  const document = window.document;
  document.body.innerHTML = content;
  return document;
};

const content = (dom) => dom.documentElement.outerHTML;

/**
 * effectful function that takes a filePath
 * hashes the file and copies it to a file with the hash in the name
 * it then returns the name.
 */
const getHash = async (filePath) =>
  await assetHash.getHashedName(filePath).catch((err) => console.log(err));

// const hashEl = async (el, attr, outputDir) => {
//   console.log("💜 attrubite name - " + el[attr]);
//   console.log("💚 filepath - ", __dirname + "/" + outputDir + el[attr]);
//   return await assetHash
//     // need to do some link sanatizing
//     // this fails if the plugin that processes my scss -> css doesn't beat it to this point
//     //  it's also not getting consistant hashs on the content??? which means it's not very usefull

//     .getHashedName(__dirname + "/" + outputDir + el[attr])
//     .then((name) => {
//       // TODO can I check if eleventy set to --quiet ? and not log
//       console.log("🧡 HASH - " + name);
//       const filePath = el[attr];
//       const link = filePath.split("/").slice(0, -1).concat(name).join("/");
//       // what happens if you try to rename a file to one that allready exists?
//       // docs say it will be overwritten
//       // fs.renameSync(
//       //   __dirname + outputDir + filePath,
//       //   __dirname + outputDir + link,
//       // );
//       fs.copyFileSync(
//         __dirname + "/" + outputDir + filePath,
//         __dirname + "/" + outputDir + link,
//       );
//       el[attr] = link;
//       return name;
//     })
//     .catch((err) => console.log(err));
// };

module.exports = (eleventyConfig, pluginOptions = {}) => {
  const SELECTOR = pluginOptions.selector || "[data-asset-hash]";

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

  eleventyConfig.on(
    "eleventy.after",
    async ({ dir, results, runMode, outputMode }) => {
      // Because we wait till pages are built and then overwrite the templates
      // many asset listed in the <head> and shared accross multiple pages will
      // not need rehashing, just re-linking. So let's keep track of them here.
      const getHashedName = memoize(getHash);

      const pagesWithAssets = results.reduce((acc, resultObj) => {
        if (resultObj.outputPath.includes("html")) {
          const hdom = dom(resultObj.content);
          const assetLinks = hdom.querySelectorAll(SELECTOR);
          console.log({ SELECTOR });
          console.log(assetLinks.length);
          return assetLinks.length > 0
            ? [...acc, { ...resultObj, dom: hdom, assetLinks }]
            : acc;
        } else {
          return acc;
        }
      }, []);

      const fullPath = (link) => __dirname + "/" + dir.output + link;

      const hashedFileLink = (hashName, noneHashedPath) => {
        const link = noneHashedPath
          .split("/")
          .slice(0, -1)
          .concat(hashName)
          .join("/");
        fs.copyFileSync(fullPath(noneHashedPath), fullPath(link));
        return link;
      };

      const getHashedFileLink = memoize(hashedFileLink);

      const updateElement = async (element, attribute) => {
        const noneHashedPath = element[attribute];
        const name = await getHashedName(fullPath(noneHashedPath)); // iexVqFem.css || undefined
        if (name) {
          // assuming if we got a hashedname it's safe to do this
          element[attribute] = getHashedFileLink(name, noneHashedPath);
        }
      };

      /**
				  [
						{
							"inputPath": "./src/css/styles.scss",
							"outputPath": "dist/css/styles.css",
							"url": "/css/styles.css",
							"content": "String or Buffer",
							"dom": "happy-dom representation of content",
							"assetLinks": "the elements that link to assets that need fingerprinting",
						}
					]	
			 */
      for (let page of pagesWithAssets) {
        for (let el of page.assetLinks) {
          switch (el.tagName) {
            case "LINK":
              await updateElement(el, "href");
              break;

            case "SCRIPT":
              await updateElement(el, "src");
              break;
            default:
              break;
          }
        }

        fs.writeFileSync(__dirname + "/" + page.outputPath, content(page.dom));
      }

      // pagesWithAssets.forEach(async (res) => {
      //   const outputDir = dir.output;
      //   for (let el of res.assetLinks) {
      //     switch (el.tagName) {
      //       case "LINK":
      //         await hashEl(el, "href", outputDir);
      //         break;
      //       case "SCRIPT":
      //         await hashEl(el, "src", outputDir);
      //         break;
      //       default:
      //         break;
      //     }
      //   }
      //   // write new content to file
      //   // return document.documentElement.outerHTML;
      //   fs.writeFile(res.outputPath, content(res.dom), (err) => {
      //     if (err) throw err;
      //     console.log("The file has been saved!");
      //   });
      // });
    },
  );
};
