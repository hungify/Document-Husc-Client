import { Avatar, Card, Typography } from "antd";
import DrawerCustom from "components/DrawerCustom";
import React from "react";
import styled from "styled-components";


export default function DrawerFlexible({ title, placement, children, visible, onCloseDrawer }) {
  return (
    <DrawerCustom
      title={title}
      placement={placement}
      onCloseDrawer={onCloseDrawer}
      visible={visible}
    >

    </DrawerCustom>
  );
}
