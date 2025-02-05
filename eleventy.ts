import { z } from "zod";

/** @module eleventy
 * Eleventy passes a lot of data around with no types so we're going to define
 * some expectations here that our code knows what the contract is.
 *
 * I'm experimenting with making everything optional as much of it seems ot be
 * in 11ty. This means I can run tests with very minimal object deffinitions and
 * still get clues about what shape the data should be in the application.
 *
 * Unfortunately it does not provide and real type safety.
 */

type CollectionItem = {
  content?: any[];
  data?: any[];
  date?: string;
  filePathStem?: string;
  fileSlug?: string;
  groupNumber?: number;
  inputPath?: string;
  outputPath?: string;
  page?: any[];
  rawInput?: string;
  template?: any;
  templateContent?: any[];
  url?: string;
};

type Page = {
  date?: Date;
  filePathStem?: string;
  fileSlug?: string;
  inputPath?: string;
  outputFileExtension?: string;
  outputPath?: string;
  rawInput?: string;
  templateSyntax?: string;
  url?: string;
};

export type ViewProps = {
  baseUrl?: string;
  content?: string;
  description?: string; // " for opengraph metadata"
  page?: Page;
  socialImage?: string; // " for opengraph metadata (external link or path to file)"
  socialImageAlt?: string; // " alt text describing social preview image, if you do not include this then it will fallback to the default image / alt"
  title?: string;
  collections?: { [k: string]: CollectionItem[] };
};

// const { content, title } = data;

// const links = data.collections["menu"].map((entry) => [
//   entry.data.title,
//   entry.url,
// ]);

const absoluteUrl = (base: string, url: string): string | URL => {
  if (base) {
    try {
      return new URL(url, base).href;
    } catch (err) {
      console.error(err);
      return url;
    }
  } else {
    return url;
  }
};

export const headDefaultProps = {
  baseUrl: "",
  title: "Breathe Easy Sheffield",
  description:
    "An eclectic series of Covid safer social & cultural events, designed with enhanced safety measures in place to reduce transmission risk. Launching autumn 2024.",
  socialImage: "/static/img/ogimage-default.png",
  socialImageAlt: "Breath Easy's logo",
};

export const HeadSchema = z
  .object({
    baseUrl: z.string().default(headDefaultProps.baseUrl),
    description: z.string().default(headDefaultProps.description),
    socialImage: z.string().default(headDefaultProps.socialImage),
    socialImageAlt: z.string().default(headDefaultProps.socialImageAlt),
    title: z.string(),
    page: z.object({ url: z.string() }),
  })
  .transform((props) => {
    return {
      description: props.description,
      socialImage:
        // if no alt description for image is provided fallback to default
        props.socialImageAlt === headDefaultProps.socialImageAlt
          ? absoluteUrl(props.baseUrl, headDefaultProps.socialImage)
          : absoluteUrl(props.baseUrl, props.socialImage),
      socialImageAlt:
        // prevent alt description being overridden when custom social image not in use
        props.socialImage === headDefaultProps.socialImage
          ? headDefaultProps.socialImageAlt
          : props.socialImageAlt,
      title:
        props.page.url === "/"
          ? props.title
          : `${headDefaultProps.title} | ${props.title}`,
      url: absoluteUrl(props.baseUrl, props.page.url),
    };
  });

export type HeadProps = z.infer<typeof HeadSchema>;
