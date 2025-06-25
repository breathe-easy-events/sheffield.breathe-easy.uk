export type SectionProps = {
  children: JSX.Children;
};

export const Section = ({ children }: SectionProps): JSX.Element => (
  <div className="section-outer">
    <div className="section-inner">{children}</div>
  </div>
);
