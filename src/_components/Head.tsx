import { HeadProps } from "../../eleventy";

export const Head = ({
  title,
  description,
  socialImage,
  socialImageAlt,
  url,
}: HeadProps): JSX.Element => {
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
