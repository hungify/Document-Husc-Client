import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { routePathDefinition } from "routes";
import useBreadcrumbs from "use-react-router-breadcrumbs";

export default function DynamicBreadcrumb() {
  const breadcrumbs = useBreadcrumbs(routePathDefinition);

  return (
    <Breadcrumb style={{ margin: "20px 0" }}>
      {breadcrumbs.map(({ match, breadcrumb }) => {
        console.log("🚀 :: match, breadcrumb", match);
        console.log("🚀 :: breadcrumb", breadcrumb);

        return (
          <Breadcrumb.Item key={match.pathname}>
            <Link to={match.pathname}>{breadcrumb}</Link>
          </Breadcrumb.Item>
        );
      })}
    </Breadcrumb>
  );
}
