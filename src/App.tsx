import React, { useState } from "react";
import Router from "./Router";
import styled from "styled-components";
import GlobalStyle from "./GlobalStyle";
import { lightTheme, darkTheme } from "./theme";
import { ThemeProvider } from "styled-components";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { isDarkAtom } from "./atoms";

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
  const isDark = useRecoilValue(isDarkAtom);
  const toggleDarkAtom = useSetRecoilState(isDarkAtom);
  return (
    <>
      <ThemeProvider theme={isDark ? lightTheme : darkTheme}>
        <GlobalStyle />
        <ToggleButton onClick={() => toggleDarkAtom((prev) => !prev)}>
          {isDark ? "Light" : "Dark"}
        </ToggleButton>
        <Router />
      </ThemeProvider>
    </>
  );
}

export default App;
