import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "Encode Sans Expanded", sans-serif;
}

body {
  background-color: #f0f2f5;
}

h1, h2, h3, h4, h5 {
  margin-bottom: 0 !important;
}

//Override antd
.ant-menu {
  background-color: transparent;
}

.ant-menu-item .ant-menu-item-icon, .ant-menu-submenu-title .ant-menu-item-icon, .ant-menu-item .anticon, .ant-menu-submenu-title .anticon {
  font-size: 18px;
}
`;
