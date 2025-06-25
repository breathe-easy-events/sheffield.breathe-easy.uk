export type HeroProps = {
  title: string;
};

export const Hero = ({ title }: HeroProps): JSX.Element => (
  <div className="hero">
    <h1>{title}</h1>
  </div>
);
