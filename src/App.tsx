import React, { useState } from "react";
import Router from "./Router";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { lightTheme, darkTheme } from "./theme";
import { ThemeProvider } from "styled-components";

const ToggleButton = styled.div`
  border-radius: 8px;
  background-color: ${(props) => props.theme.tabColor};
  width: 40px;
  height: 20px;
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 10px;
  right: 10px;
  top: 40px;
`;

function App() {
  const [theme, setTheme] = useState(true);
  const toggleTheme = () => {
    setTheme((p) => !p);
  };
  return (
    <>
      <ThemeProvider theme={theme ? lightTheme : darkTheme}>
        <GlobalStyle />
        <ToggleButton onClick={toggleTheme}>
          {theme ? "Light" : "Dark"}
        </ToggleButton>
        <Router theme={theme} />
      </ThemeProvider>
    </>
  );
}

export default App;
