import { ReactNode } from "react";
import { JSX } from "react/jsx-runtime";
export type SectionProps = {
  children: ReactNode;
};

export const Slider = ({ children }: SectionProps): JSX.Element => (
  <div className="slider-outer">
    <div className="slider-inner">{children}</div>
  </div>
);
