import React, { useContext } from "react";
import styled from "styled-components";
import Wrapper from "./components/UI/Wrapper";
import ShowText from "./components/ShowText/ShowText";
import DndSection from "./components/DndSection/DndSection";
import { WordsContext } from "./store/words-context";
import LoadingIndicator from "./components/UI/LoadingIndicator";

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
  const wordsCtx = useContext(WordsContext);

  return (
    <>
      <Wrapper>
        {wordsCtx.isLoading ? (
          <LoadingIndicator />
        ) : (
          <TempWrapper>
            <h2>Translate this sentence</h2>
            <ShowText />
            <DndSection />
          </TempWrapper>
        )}
      </Wrapper>
    </>
  );
}

export default App;
