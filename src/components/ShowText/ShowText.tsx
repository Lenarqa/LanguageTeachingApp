import React from "react";
import styled from "styled-components";
import TextSection from "./TextSection";
import User from "./User";
import { useContext } from "react";
import { WordsContext } from "../../store/words-context";

const ShowTextDiv = styled.div`
  min-height: 9rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ShowText: React.FC = (props) => {
  const wordsCtx = useContext(WordsContext);
  return (
    <ShowTextDiv>
      <User />
      <TextSection />
    </ShowTextDiv>
  );
};

export default ShowText;
