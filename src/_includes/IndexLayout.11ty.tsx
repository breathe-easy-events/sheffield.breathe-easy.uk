import { Head } from "../_components/Head";
import { Header } from "../_components/Header";
import { Hero } from "../_components/Hero";
import { Section } from "../_components/Section";
import { ViewProps, HeadSchema } from "../../eleventy";

export const IndexLayout = (data: ViewProps): JSX.Element => {
  const {
    baseUrl,
    content,
    description,
    page,
    socialImage,
    socialImageAlt,
    title,
  } = data;

  const links = data.collections["menu"].map((entry) => [
    entry.data.title,
    entry.url,
  ]);

  return (
    <html lang="en">
      {Head(HeadSchema.parse(data))}
      <body>
        <a href="#main" class="screen-reader-only">
          skip to content
        </a>
        {Header({ links, currentPage: data.page.url, bottomEl: false })}
        <main id="main">
          <Section>
            <Hero title={title}></Hero>
            {content}
          </Section>
        </main>
      </body>
      <script data-asset-hash src="/js/index.js"></script>
    </html>
  );
};

export const render = IndexLayout;
