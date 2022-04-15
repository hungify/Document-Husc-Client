import { Breadcrumb } from "antd";
import React from "react";
import { Link } from "react-router-dom";
import { routePathDefinition } from "routes";
import styled from "styled-components";
import useBreadcrumbs from "use-react-router-breadcrumbs";

const BreadcrumbAnt = styled(Breadcrumb)`
  padding: 10px;
  padding-left: 0;
  margin-bottom: 5px;
`;
const BreadcrumbItemAnt = styled(Breadcrumb.Item)`
  padding: 5px;
  padding-left: 0;
  box-sizing: border-box;
  font-weight: 400;
  border-radius: 5px;
  color: rgba(0, 0, 0, 0.87);
`;
export default function BreadcrumbTrail() {
  const breadcrumbs = useBreadcrumbs(routePathDefinition);

  return (
    <BreadcrumbAnt>
      {breadcrumbs.map(({ match, breadcrumb }) => (
        <BreadcrumbItemAnt key={match.pathname}>
          <Link to={match.pathname}>{breadcrumb}</Link>
        </BreadcrumbItemAnt>
      ))}
    </BreadcrumbAnt>
  );
}
