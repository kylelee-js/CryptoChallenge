import reset from "styled-reset";
import { createGlobalStyle } from "styled-components";

const GlobalStyle = createGlobalStyle`
  ${reset};
  
  body {
    font-family: 'Roboto', sans-serif;
  }
  a {
    text-decoration: none;
  }

`;

export default GlobalStyle;
