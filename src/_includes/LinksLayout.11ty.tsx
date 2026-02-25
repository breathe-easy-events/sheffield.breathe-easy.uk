import { JSX } from "react/jsx-runtime";
import { Head } from "../_components/Head";
import { Header } from "../_components/Header";
import { Hero } from "../_components/Hero";
import { Section } from "../_components/Section";
import { ViewInput, ViewSchema, HeadSchema } from "../../eleventy";

export const IndexLayout = (data: ViewInput): JSX.Element => {
  const { content, title, menu, currentUrl, links } = ViewSchema.parse(data);

  // NOTE: ensure never an empty list
  if (links.length === 0) {
    links.push({
      text: "Homepage",
      url: "https://sheffield.breathe-easy.uk/",
    });
  }

  return (
    <html lang="en">
      {Head(HeadSchema.parse(data))}
      <body>
        <a href="#main" className="screen-reader-only">
          skip to content
        </a>
        {/* {Header({ menu, currentUrl, bottomEl: false })} */}
        <main id="main" className="links-page">
          <Section>
            <div className="stack stack-gap-3xs">
              <h1>Breathe Easy Sheffield</h1>
              <p className="fw600">
                For folks who love going out and not getting sick
              </p>
            </div>
            <ul role="list" className="stack stack-gap-2xs">
              {links.map(({ url, text }) => (
                <li>
                  <a href={url}>{text}</a>
                </li>
              ))}
            </ul>
          </Section>
        </main>
      </body>
      <script data-asset-hash src="/js/index.js"></script>
    </html>
  );
};

export const render = IndexLayout;
