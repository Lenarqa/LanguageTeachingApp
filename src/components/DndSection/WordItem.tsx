import React from "react";
import styled from "styled-components";
import { GridItem } from "react-grid-dnd";


interface WordItemProps {
  id: number;
  content: string;
}

const WordItemStyled = styled.div`
  cursor: pointer;
  background: #fff;
  border: 1px solid #c9c9c9;
  box-sizing: border-box;
  box-shadow: 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
  border-radius: 13px;
  padding: 4px 18px 5px 18px;
  margin: 4px 10px 4px 0px;
  text-align: center;
`;

const WordItem: React.FC<WordItemProps> = (props) => {
  return (
      <GridItem key={props.id}>
        <WordItemStyled>
          {props.content}
        </WordItemStyled>
      </GridItem>
      
  );
};

export default WordItem;
