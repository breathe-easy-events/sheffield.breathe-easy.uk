export const devServerOptions = (eleventyConfig: any) => {
  // see all options https://www.11ty.dev/docs/dev-server/
  eleventyConfig.setServerOptions({ domDiff: false });
};
