import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  box-sizing: border-box;
  padding: 0;
  margin: 0;
  font-family: "Encode Sans Expanded", sans-serif;
}
h1, h2, h3, h4, h5 {
  margin-bottom: 0 !important;
}
`;
