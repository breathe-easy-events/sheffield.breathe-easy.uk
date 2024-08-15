export type SectionProps = {
  children: JSX.Children;
};

export const Section = ({ children }: SectionProps): JSX.Element => (
  <div class="section-outer">
    <div class="section-inner">{children}</div>
  </div>
);
