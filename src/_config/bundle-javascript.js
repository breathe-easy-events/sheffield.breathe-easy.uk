const esbuild = require("esbuild");

module.exports = (eleventyConfig, pluginOptions = {}) => {
  const DIRNAME = pluginOptions.dirname || __dirname;
  console.log(DIRNAME);
  eleventyConfig.addExtension("js", {
    outputFileExtension: "js",
    compile: async (_, path) => {
      if (path !== DIRNAME + "/src/scripts/index.js") {
        return;
      }

      return async () => {
        let { outputFiles } = await esbuild.build({
          target: "es2020",
          entryPoints: [path],
          minify: true,
          bundle: true,
          write: false,
        });

        return outputFiles[0].text;
      };
    },
  });
};
