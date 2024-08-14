export type HeroProps = {
  title: string;
};

export const Hero = ({ title }: HeroProps): JSX.Element => (
  <div class="hero">
    <h1>{title}</h1>
  </div>
);
