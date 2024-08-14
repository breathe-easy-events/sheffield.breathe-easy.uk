import { ViewProps } from "../../eleventy";
import { Heading } from "../_components/Heading";
import { Head } from "../_components/Head";

export const MainLayout = ({ content, title }: ViewProps): JSX.Element => (
  <html lang="en">
    <Head title={title}></Head>
    <body>
      <Heading title={title}></Heading>
      {content}
    </body>
    <script data-asset-hash src="/js/index.js"></script>
  </html>
);

export const render = MainLayout;
