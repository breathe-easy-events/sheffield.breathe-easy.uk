import { JSX } from "react/jsx-runtime";
import { Head } from "../_components/Head";
import { Header } from "../_components/Header";
import { Hero } from "../_components/Hero";
import { Section } from "../_components/Section";
import { ViewInput, ViewSchema, HeadSchema } from "../../eleventy";

export const IndexLayout = (data: ViewInput): JSX.Element => {
  const { content, title, links, currentUrl } = ViewSchema.parse(data);

  return (
    <html lang="en">
      {Head(HeadSchema.parse(data))}
      <body>
        <a href="#main" className="screen-reader-only">
          skip to content
        </a>
        {Header({ links, currentUrl, bottomEl: false })}
        <main id="main">
          <Section>
            <Hero title={title}></Hero>
            <div className="content stack">{content}</div>
          </Section>
        </main>
      </body>
      <script data-asset-hash src="/js/index.js"></script>
    </html>
  );
};

export const render = IndexLayout;
