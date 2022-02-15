import React from 'react';
import styled from 'styled-components';
import Wrapper from './components/UI/Wrapper';
import ShowText from './components/ShowText/ShowText';

const TempWrapper = styled.div`
  h2 {
    color: black;
    text-shadow: 2px 4px 3px rgba(0,0,0,0.1);
  }

`


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
