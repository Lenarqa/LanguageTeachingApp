import React, { useContext } from "react";
import styled from "styled-components";
import { WordsContext } from "../../store/words-context";
import LoadingIndicator from "./LoadingIndicator";

const WrapperStyle = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
  background-color: #e5e5e5;
`;

const Wrapper: React.FC = (props) => {
  const wordsCtx = useContext(WordsContext);

  return <WrapperStyle>{wordsCtx.isLoading ? <LoadingIndicator /> : props.children}</WrapperStyle>;
};

export default Wrapper;
