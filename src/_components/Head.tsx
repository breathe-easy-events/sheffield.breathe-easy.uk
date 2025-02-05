import { z } from "zod";

export type HeadProps = {
  baseUrl?: string;
  description?: string; // "[optional] for opengraph metadata"
  socialImage?: string; // "[optional] for opengraph metadata (external link or path to file)"
  socialImageAlt?: string; // "[optional] alt text describing social preview image, if you do not include this then it will fallback to the default image / alt"
  title: string;
  url: string;
};

const defaultProps = {
  baseUrl: "",
  title: "Breathe Easy Sheffield",
  description:
    "An eclectic series of Covid safer social & cultural events, designed with enhanced safety measures in place to reduce transmission risk. Launching autumn 2024.",
  socialImage: "/static/img/ogimage-default.png",
  socialImageAlt: "Breath Easy's logo",
};

const propsSchema = z
  .object({
    baseUrl: z.string().default(defaultProps.baseUrl),
    description: z.string().default(defaultProps.description),
    socialImage: z.string().default(defaultProps.socialImage),
    socialImageAlt: z.string().default(defaultProps.socialImageAlt),
    title: z.string(),
    url: z.string(),
  })
  .transform((props) => {
    return {
      ...props,
      socialImage:
        // if no alt description for image is provided fallback to default
        props.socialImageAlt === defaultProps.socialImageAlt
          ? absoluteUrl(props.baseUrl, defaultProps.socialImage)
          : absoluteUrl(props.baseUrl, props.socialImage),
      socialImageAlt:
        // prevent alt description being overridden when custom social image not in use
        props.socialImage === defaultProps.socialImage
          ? defaultProps.socialImageAlt
          : props.socialImageAlt,
      title:
        props.url === "/"
          ? props.title
          : `${defaultProps.title} | ${props.title}`,
      url: absoluteUrl(props.baseUrl, props.url),
    };
  });

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

export const Head = (props: HeadProps): JSX.Element => {
  const { title, description, socialImage, socialImageAlt, url } =
    propsSchema.parse(props);

  return (
    <head>
      <meta charset="UTF-8" />
      <meta property="og:type" content="website" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" type="image/png" href="/static/img/favicon.png" />
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta property="og:title" content={title} />
      <link rel="canonical" href={url} />
      <meta property="og:url" content={url} />
      <meta name="description" content={description} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={socialImage} />
      <meta property="og:image:alt" content={socialImageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="theme-color" content="#044156" />
      <link data-asset-hash href="/css/styles.css" rel="stylesheet" />
    </head>
  );
};
