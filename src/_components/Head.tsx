export type HeadProps = {
  title: string;
};

export const Head = ({ title }: HeadProps): JSX.Element => (
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <link
      rel="icon"
      href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🌞</text></svg>"
    />
    <title>{title}</title>
    <meta name="title" content="{title}" />
    <link data-asset-hash href="/css/styles.css" rel="stylesheet" />
  </head>
);
