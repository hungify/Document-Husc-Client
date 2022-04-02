import { ArrowUpOutlined } from "@ant-design/icons";
import { BackTop } from "antd";
import React from "react";
import styled from "styled-components";

const WrapperIcon = styled.div`
  box-shadow: 0 0.6em 1em 0.2em;
  transform: translateY(0%);
  transition: ease-out 200ms;
  transition-property: transform, background-color;
  min-width: 3rem;
  height: 3rem;
  border-radius: 50%;
  display: grid;
  place-items: center;
  text-decoration: none;
  color: #fff;
  background-color: hsl(210, 100%, 39%);
  box-shadow: 0 0.6em 1em 0.2em hsla(210, 100%, 39%, 0.4);

  &::after {
    content: "";
    position: absolute;
    left: 0;
    top: 50%;
    width: 100%;
    height: 200%;
    transform: translateY(-30%);
    background-color: rgba(0, 0, 0, 0);
    display: block;
  }
  &:hover {
    transform: translateY(-22%);
    background-color: hsl(210, 100%, 49%);
  }
`;

const BackTopAnt = styled(BackTop)`
  right: 65px;
`;
export default function GotoTop() {
  return (
    <BackTopAnt visibilityHeight={1000}>
      <WrapperIcon>
        <ArrowUpOutlined />
      </WrapperIcon>
    </BackTopAnt>
  );
}
