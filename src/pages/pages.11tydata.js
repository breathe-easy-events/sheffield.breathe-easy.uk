import { execSync } from "node:child_process";

export default {
  permalink: "/{{ page.fileSlug }}/",
  layout: "PageLayout.11ty.tsx",
  eleventyComputed: {
    lastUpdated: (data) => {
      const result = execSync(
        `git log -1 --pretty="format:%cI" ${data.page?.inputPath}`,
      ).toString();
      const d = new Date(result);
      return d.toLocaleDateString();
    },
    changeLogLink: (data) =>
      `https://github.com/breathe-easy-events/sheffield.breathe-easy.uk/commits/main/${data.page?.inputPath.slice(2)}`,
  },
};
