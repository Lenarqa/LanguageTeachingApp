import React from "react";
import { Draggable } from "react-beautiful-dnd";

import {
  GridItem,
} from "react-grid-dnd";

import styled from "styled-components";
import { IWordNew } from "../../models/models";

interface WordItemProps {
  id: number;
  content: string;
}


const WordItemWrapper = styled.div`
  background: #e6e6e6;
  box-shadow: inset 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
  width: 30px;
  height: 10px;
`;

const WordItemStyled = styled.div`
  cursor: pointer;
  background: #fff;
  border: 1px solid #c9c9c9;
  box-sizing: border-box;
  box-shadow: 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
  border-radius: 13px;
  padding: 4px 18px 5px 18px;
  margin: 4px 10px 4px 0px;
`;

const WordItem: React.FC<WordItemProps> = (props) => {  
  return (
    <GridItem key={props.id}>
      <WordItemStyled>{props.content}</WordItemStyled>
    </GridItem>
  );
};

export default WordItem;
