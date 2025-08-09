import { JSX } from "react/jsx-runtime";
import { TOC } from "./TOC.tsx";

type TableOfContentsProps = { children: string };

export const TableOfContents = ({
  children,
}: TableOfContentsProps): JSX.Element => {
  return (
    <details open>
      <summary>Table of Contnets</summary>
      {TOC(children)}
    </details>
  );
};
