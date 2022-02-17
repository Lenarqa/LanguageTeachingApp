import React, { useRef, useState } from "react";

import styled from "styled-components";


interface IWordItem {
  word: string;
}

const WordItemStyled = styled.div`
  cursor: pointer;
  border: 1px solid #c9c9c9;
  box-sizing: border-box;
  box-shadow: 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
  border-radius: 13px;
  padding: 4px 18px 5px 18px;
  margin-left: 10px;
`;

const WordItem: React.FC<IWordItem> = (props) => {
  return <WordItemStyled>{props.word}</WordItemStyled>;
};

export default WordItem;
