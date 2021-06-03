import React from "react";
import styled from "styled-components";
import Main from "./containers/main";
import theme from "./theme/theme";
import { MuiThemeProvider } from "@material-ui/core/styles";

const StyledApp = styled.div`
  display: flex;
  z-index: 0;
  width: 100%;
  height: 100vh;
  background: #e4eced;
  overflow: auto;
`;

function App() {
  return (
    <MuiThemeProvider theme={theme}>
      <StyledApp>
        <Main />
      </StyledApp>
    </MuiThemeProvider>
  );
}

export default App;
