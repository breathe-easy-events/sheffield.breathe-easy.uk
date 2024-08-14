export type HeadProps = {
  baseUrl: string;
  title: string;
  url: string;
  emoji?: string; // "[optional] for insertion to favicon"
  description?: string; // "[optional] for opengraph metadata"
  socialImage?: string; // "[optional] for opengraph metadata (external link or path to file)"
  socialImageAlt?: string; // "[optional] alt text describing social preview image, if you do not include this then it will fallback to the default image / alt"
};

const defaultProps = {
  emoji: "🌞",
  title: "Breathe Easy Sheffield",
  description:
    "An eclectic series of Covid safer social & cultural events, designed with enhanced safety measures in place to reduce transmission risk. Launching autumn 2024.",
  socialImage: "/static/img/ogimage-default.png",
  socialImageAlt: "Breath Easy's logo",
};

export const Head = ({
  baseUrl,
  title,
  url,
  description = defaultProps.description,
  socialImage = defaultProps.socialImage,
  socialImageAlt = defaultProps.socialImageAlt,
}: HeadProps): JSX.Element => {
  const title_ = url === "/" ? title : `${defaultProps.title} | ${title}`;
  const url_ = baseUrl + url;
  return (
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link
        rel="icon"
        href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌞</text></svg>"
      />
      <title>{title_}</title>
      <meta name="title" content={title_} />
      <link rel="canonical" href={url_} />
      <meta name="description" content={description} />
      <meta property="og:url" content={url_} />
      <meta property="og:type" content="website" />
      <meta property="og:title" content={title_} />
      <meta property="og:description" content={description} />
      {/* must set alt text in order to use a custom social image */}
      {socialImageAlt === defaultProps.socialImageAlt ? (
        <meta
          property="og:image"
          content={baseUrl + defaultProps.socialImage}
        />
      ) : (
        <meta property="og:image" content={baseUrl + socialImage} />
      )}
      <meta property="og:image:alt" content={socialImageAlt} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="theme-color" content="#044156" />
      <link data-asset-hash href="/css/styles.css" rel="stylesheet" />
    </head>
  );
};
