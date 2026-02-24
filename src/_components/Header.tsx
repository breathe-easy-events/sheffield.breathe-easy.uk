import { JSX } from "react/jsx-runtime";
import { Links } from "../../eleventy";

export type HeaderProps = {
  menu: Links;
  currentUrl: string;
  bottomEl: boolean; // wtf was this meant to be
};

export const Header = ({ menu, currentUrl }: HeaderProps): JSX.Element => {
  return (
    <header className="header">
      <nav>
        <ul role="list">
          <li>
            <a aria-current={currentUrl === "/" ? "page" : null} href="/">
              Home
            </a>
          </li>
          {menu.map(({ title, url }) => (
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
