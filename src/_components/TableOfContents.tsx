import { JSX } from "react/jsx-runtime";
import { toc } from "./toc";

type TableOfContentsProps = { children: string };

export const TableOfContents = ({
  children,
}: TableOfContentsProps): JSX.Element => {
  return (
    <details open={true}>
      <summary>Table of Contnets</summary>
      {toc(children)}
    </details>
  );
};
