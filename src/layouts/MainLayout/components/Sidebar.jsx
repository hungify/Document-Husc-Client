import { Layout } from "antd";
import useScrollPosition from "hooks/useScrollPosition";
import React from "react";
import styled from "styled-components";

const SiderAnt = styled(Layout.Sider)`
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: auto;
  margin-top: ${(props) =>
    props.shouldFixedHeader ? "64px" : props.scrollPosition > 40 ? "0" : "64px"};
  transition: margin-top 0.5s ease-in-out;
  .ant-layout-sider-trigger {
    background-color: #488fb1;
    color: #fff;
  }
  & .ant-layout-sider-children,
  & .ant-menu-root.ant-menu-vertical,
  .ant-menu-root.ant-menu-vertical-left,
  .ant-menu-root.ant-menu-vertical-right,
  .ant-menu-root.ant-menu-inline {
    background-color: rgba(248, 250, 252, 1);
  }
  & .ant-menu:not(.ant-menu-horizontal) .ant-menu-item-selected {
    background-color: rgb(255, 255, 255);
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    font-weight: bold;
  }

  & .ant-menu-light .ant-menu-item:hover,
  .ant-menu-light .ant-menu-item-active,
  .ant-menu-light .ant-menu:not(.ant-menu-inline) .ant-menu-submenu-open,
  .ant-menu-light .ant-menu-submenu-active,
  .ant-menu-light .ant-menu-submenu-title:hover {
    background-color: rgba(255, 255, 255, 1);
  }
`;

export default function Sidebar(props) {
  const { collapsed, onCollapse, shouldFixedHeader } = props;
  const scrollPosition = useScrollPosition();

  return (
    <SiderAnt
      {...props}
      collapsible
      collapsed={collapsed}
      onCollapse={(collapsed) => onCollapse(collapsed)}
      shouldFixedHeader={shouldFixedHeader}
      scrollPosition={shouldFixedHeader ? undefined : scrollPosition}
    >
      {props.children}
    </SiderAnt>
  );
}
