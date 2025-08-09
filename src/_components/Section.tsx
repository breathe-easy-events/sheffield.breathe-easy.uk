import { ReactNode } from "react";
import { JSX } from "react/jsx-runtime";
export type SectionProps = {
  children: ReactNode;
};

export const Section = ({ children }: SectionProps): JSX.Element => (
  <div className="center-outer">
    <div className="center-inner">
      <div className="stack">{children}</div>
    </div>
  </div>
);
