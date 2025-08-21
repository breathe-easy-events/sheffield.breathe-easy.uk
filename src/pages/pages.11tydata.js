import { execSync } from "node:child_process";

export default {
  permalink: "/{{ page.fileSlug }}/",
  layout: "PageLayout.11ty.tsx",
  eleventyComputed: {
    // // NOTE: could go the API route bit need an auth token which is a pain.
    //   lastUpdated: async (data) => {
    //     const filePath = data.page.inputPath.replace(/^.\//, ""); // remove leading "./"
    //     const url = `https://api.github.com/repos/breathe-easy-events/sheffield.breathe-easy.uk/commits?path=${filePath}&per_page=1`;
    //
    //     // const res = await fetch(url);
    //     const res = await fetch(url, {
    //       headers: {
    //         "User-Agent": "eleventy-build",
    //         Authorization: `Bearer ${process.env.GITHUB_TOKEN}`, // optional, but recommended
    //       },
    //     });
    //
    //     if (!res.ok) {
    //       console.error("❌ GitHub API failed:", res.statusText);
    //       return null;
    //     }
    //
    //     const commits = await res.json();
    //     const isoDate = commits[0]?.commit?.committer?.date;
    //     if (!isoDate) return null;
    //
    //     const date = new Date(isoDate);
    //     const intl = new Intl.DateTimeFormat("en-GB", { dateStyle: "short" });
    //     return intl.format(date);
    //   },
    // lastUpdated: (data) => {
    //   // NOTE:  this fails in cloudflare because they do a shallow clone, so all the files get the same date
    //   // could I potentially just do a second git clone into a tmp folder and get the actual commit dates from there????
    //   const result = execSync(
    //     `git log -1 --pretty="format:%cI" ${data.page?.inputPath}`,
    //   ).toString();
    //   console.log("🍎:", result);
    //   const date = new Date(result);
    //   const intl = new Intl.DateTimeFormat("en-GB", { dateStyle: "short" });
    //
    //   return intl.format(date);
    // },
    changeLogLink: (data) =>
      `https://github.com/breathe-easy-events/sheffield.breathe-easy.uk/commits/main/${data.page?.inputPath.slice(2)}`,
  },
};
