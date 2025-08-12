import eleventySass from "@11tyrocks/eleventy-plugin-sass-lightningcss";
import { renderToStaticMarkup } from "react-dom/server";
import { bundleJavascript } from "./src/_config/bundle-javascript.ts";
import { hashAssets } from "./src/_config/hash-assets.ts";
import { collections } from "./src/_config/collections.ts";
import { markdownLibrary } from "./src/_config/markdown-library.ts";
import { devServerOptions } from "./src/_config/dev-server-options.ts";
import * as url from "url";
const __dirname = url.fileURLToPath(new URL(".", import.meta.url));

export default function (eleventyConfig: any) {
  // data
  eleventyConfig.addGlobalData("baseUrl", process.env.BASE_URL || "");

  // static files
  eleventyConfig.addPassthroughCopy("src/static");
  eleventyConfig.addPassthroughCopy("src/admin");

  // process css
  eleventyConfig.addPlugin(eleventySass);

  // eleventy typescript / TSX support
  eleventyConfig.addExtension(["11ty.jsx", "11ty.ts", "11ty.tsx"], {
    key: "11ty.js",
    compile: function () {
      return async function (data) {
        const content = await this.defaultRenderer(data);
        return renderToStaticMarkup(content);
      };
    },
  });
  eleventyConfig.addTemplateFormats(["11ty.jsx", "11ty.ts", "11ty.tsx"]);
  // client TS support
  eleventyConfig.addPlugin(bundleJavascript, {
    entryPoint: "./src/js/index.ts",
    ts: true,
  });

  // break cache on static assets like CSS
  eleventyConfig.addPlugin(hashAssets, { dirname: __dirname });

  // add custom collections
  eleventyConfig.addPlugin(collections);
  eleventyConfig.addPlugin(devServerOptions);

  // markdown rendering options
  eleventyConfig.setLibrary("md", markdownLibrary);

  return {
    dir: {
      input: "src",
      output: "dist",
    },
  };
}
