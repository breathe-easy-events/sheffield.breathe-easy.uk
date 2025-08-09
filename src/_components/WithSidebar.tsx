import { JSX } from "react/jsx-runtime";

export type WithSidebarProps = {
  sidebar: JSX.Element;
  notSidebar: JSX.Element;
};

export const WithSidebar = ({
  sidebar,
  notSidebar,
}: WithSidebarProps): JSX.Element => (
  <div className="with-sidebar">
    <div className="sidebar">{sidebar}</div>
    <div className="not-sidebar">{notSidebar}</div>
  </div>
);
