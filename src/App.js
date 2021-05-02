import React from "react";
import styled from "styled-components";
import Main from "./containers/main";

const StyledApp = styled.div`
  display: flex;
  width: 100%;
  height: 100vh;
  justify-content: center;
  align-items: center;
  background: #e4eced;
`;

function App() {
  return (
    <StyledApp>
      <Main />
    </StyledApp>
  );
}

export default App;
