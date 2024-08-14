export type HeadingProps = {
  title: string;
};

export const Heading = ({ title }: HeadingProps): JSX.Element => (
  <h1>{title}</h1>
);
