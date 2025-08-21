import { execSync } from "node:child_process";

export default {
  permalink: "/{{ page.fileSlug }}/",
  layout: "PageLayout.11ty.tsx",
  eleventyComputed: {
    changeLogLink: (data) =>
      `https://github.com/breathe-easy-events/sheffield.breathe-easy.uk/commits/main/${data.page?.inputPath.slice(2)}`,
  },
};
