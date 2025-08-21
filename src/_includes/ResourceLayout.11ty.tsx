import { JSX } from "react/jsx-runtime";
import { Head } from "../_components/Head";
import { Header } from "../_components/Header";
import { Section } from "../_components/Section";
import { Slider } from "../_components/Slider";
import { WithSidebar } from "../_components/WithSidebar";
import { TableOfContents } from "../_components/TableOfContents";
import { ViewInput, ViewSchema, HeadSchema } from "../../eleventy";
import { Formatting } from "../_utils/utils.ts";

export function ResourceLayout(data: ViewInput): JSX.Element {
  const { content, title, links, currentUrl, lastUpdate, inputPath } =
    ViewSchema.parse(data);
  return (
    <html lang="en">
      {Head(HeadSchema.parse(data))}
      <body>
        <a href="#main" className="screen-reader-only">
          skip to content
        </a>
        {Header({ links, currentUrl, bottomEl: false })}
        <main id="main" className="resource-page">
          <WithSidebar
            sidebar={
              <Slider>
                <Section>
                  <TableOfContents>{content}</TableOfContents>
                </Section>
              </Slider>
            }
            notSidebar={
              <div className="stack stack-gap-l">
                <Section>
                  <h1>{title}</h1>
                </Section>
                <Section>
                  {content}
                  <p>
                    Last update:{" "}
                    <a href={Formatting.changeLogLink(inputPath)}>
                      {lastUpdate}
                    </a>
                  </p>
                </Section>
              </div>
            }
          />
        </main>
      </body>
      <script data-asset-hash src="/js/index.js"></script>
    </html>
  );
}

export const render = ResourceLayout;
