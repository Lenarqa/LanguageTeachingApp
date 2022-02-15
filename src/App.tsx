import React from "react";
import styled from "styled-components";
import Wrapper from "./components/UI/Wrapper";
import ShowText from "./components/ShowText/ShowText";

const TempWrapper = styled.div`
  h2 {
    color: #252525;
    font-style: normal;
    font-weight: normal;
    line-height: 42px;
    text-shadow: -2px -4px 3px #ffffff, 2px 4px 3px rgba(0, 0, 0, 0.25);
    font-size: 36px;
    font-weight: 400;
    margin-bottom: 20px;
    margin-bottom: 56px;
  }
`;

function App() {
  return (
    <Wrapper>
      <TempWrapper>
        <h2>Translate this sentence</h2>
        <ShowText />
        <input type="text" />
        <div>
          <p>my</p>
          <p>dear</p>
          <p>friend</p>
          <p>Hello</p>
        </div>
        <button>Check</button>
      </TempWrapper>
    </Wrapper>
  );
}

export default App;
