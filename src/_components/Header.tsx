import { JSX } from "react/jsx-runtime";
import { Links } from "../../eleventy";

export type HeaderProps = {
  links: Links;
  currentUrl: string;
  bottomEl: boolean; // wtf was this meant to be
};

export const Header = ({ links, currentUrl }: HeaderProps): JSX.Element => {
  return (
    <header className="header">
      <nav>
        <a aria-current={currentUrl === "/" ? "page" : null} href="/">
          Home
        </a>
        <ul role="list">
          {links.map(({ title, url }) => (
            <li>
              <a aria-current={currentUrl === url ? "page" : null} href={url}>
                {title}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </header>
  );
};
