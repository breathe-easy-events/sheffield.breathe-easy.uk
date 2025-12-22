import { JSX } from "react/jsx-runtime";
import { Head } from "../_components/Head";
import { Header } from "../_components/Header";
import { Section } from "../_components/Section";
import { ViewInput, ViewSchema, HeadSchema } from "../../eleventy";

export function PageLayout(data: ViewInput): JSX.Element {
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
            <h1>{title}</h1>
            <div className="content stack">{content}</div>
          </Section>
        </main>
      </body>
      <script data-asset-hash src="/js/index.js"></script>
    </html>
  );
}

export const render = PageLayout;
