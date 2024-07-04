## breathe-easy.uk

Website under construction.

## notes

### pages

Pages accept the following front-matter

```yaml
title: "for pages h1 and opengraph metadata"
layout: "which template to use"
emoji: "[optional] for insertion to favicon"
description: "[optional] for opengraph metadata"
socialImage: "[optional] for opengraph metadata (external link or path to file)"
```

### cache busting

Generated assets like CSS / JS can be hashed by adding a `data-asset-hash` attribute but the `href`/`src` needs to be pointing to the root of the input directory. For example.

```html
<link data-asset-hash href="/css/styles.css" rel="stylesheet" />
```

### baseURL

Absolute urls can be generated with the `absoluteUrl` filter when the `BASE_URL` environment variable is set.

```sh
BASE_URL="https://breathe-easy.uk" npm start
```

```html
<meta property="og:url" content="{{ page.url | absoluteUrl }}" />
```
