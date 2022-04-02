import { Layout } from "antd";
import useScrollPosition from "hooks/useScrollPosition";
import React from "react";
import styled from "styled-components";

const Logo = styled.div``;

const SiderAnt = styled(Layout.Sider)`
  height: 100vh;
  margin-top: ${(props) => (props.shouldFixedHeader ? "64px" : "0")};
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  overflow: auto;
  margin-top: ${(props) => (props.scrollPosition < 40 && !props.shouldFixedHeader ? "64px" : "0")};
  transition: margin-top 0.5s ease-in-out;
  .ant-layout-sider-trigger {
    background-color: #488fb1;
    color: #fff;
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
      scrollPosition={scrollPosition}
    >
      <Logo>
        <img src="" alt="" />
      </Logo>
      {props.children}
    </SiderAnt>
  );
}
