import { JSX } from "react/jsx-runtime";
import { Head } from "../_components/Head";
import { Header } from "../_components/Header";
import { Section } from "../_components/Section";
import { Slider } from "../_components/Slider";
import { WithSidebar } from "../_components/WithSidebar";
import { TableOfContents } from "../_components/TableOfContents";
import { ViewInput, ViewSchema, HeadSchema } from "../../eleventy";

export function ResourceLayout(data: ViewInput): JSX.Element {
  const { content, title, links, currentUrl } = ViewSchema.parse(data);
  return (
    <html lang="en">
      {Head(HeadSchema.parse(data))}
      <body>
        <a href="#main" className="screen-reader-only">
          skip to content
        </a>
        {Header({ links, currentUrl, bottomEl: false })}
        <main id="main" className="resource-page">
          <div className="stack stack-gap-l">
            <WithSidebar
              sidebar={<div></div>}
              notSidebar={
                <Section>
                  <h1>{title}</h1>
                </Section>
              }
            />
            <WithSidebar
              sidebar={
                <Slider>
                  <Section>
                    <TableOfContents>{content}</TableOfContents>
                  </Section>
                </Slider>
              }
              notSidebar={
                <Section>
                  <div className="content stack">{content}</div>
                </Section>
              }
            />
          </div>
        </main>
      </body>
      <script data-asset-hash src="/js/index.js"></script>
    </html>
  );
}

export const render = ResourceLayout;
