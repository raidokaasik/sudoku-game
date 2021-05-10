import React from "react";
import styled from "styled-components";
import Main from "./containers/main";

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
    <StyledApp>
      <Main />
    </StyledApp>
  );
}

export default App;
