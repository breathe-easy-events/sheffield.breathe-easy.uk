import { ViewProps } from "../../eleventy";
import { Hero } from "../_components/Hero";
import { Head } from "../_components/Head";
import { Section } from "../_components/Section";

export const MainLayout = (data: ViewProps): JSX.Element => {
  const { content, title, baseUrl, page } = data;
  return (
    <html lang="en">
      <Head title={title} url={page.url} baseUrl={baseUrl}></Head>
      <body>
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

export const render = MainLayout;
