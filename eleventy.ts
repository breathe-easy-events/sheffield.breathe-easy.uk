/** @module eleventy
 * Eleventy passes a lot of data around with no types so we're going to define
 * some expectations here that our code knows what the contract is.
 */

export type ViewProps = {
  baseUrl: string;
  content: string;
  title: string;
  page: any;
  emoji?: string; // " for insertion to favicon"
  description?: string; // " for opengraph metadata"
  socialImage?: string; // " for opengraph metadata (external link or path to file)"
  socialImageAlt?: string; // " alt text describing social preview image, if you do not include this then it will fallback to the default image / alt"
};
