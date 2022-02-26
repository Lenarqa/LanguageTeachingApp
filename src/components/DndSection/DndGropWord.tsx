import React from "react";
import styled from "styled-components";
import WordItem from "./WordItem";

import { GridDropZone, GridItem } from "react-grid-dnd";

interface newIWord {
  id: number;
  position: number;
  content: string;
}

interface DndGroupWordsProps {
  id: string;
  newWords: newIWord[];
}

interface DndGroupWordsStyledProps {
  id: string;
}

const DndGroupWordsStyled = styled.div<DndGroupWordsStyledProps>`
  width: 482px;
  min-height: 20rem;
  margin-bottom: 10px;
  background-color: ${props => props.id === "phrase" ? 'red' : "#eee"};
`;

const DndGroupWords: React.FC<DndGroupWordsProps> = (props) => {
  return (
      <GridDropZone style={{height: "10rem"}} id={props.id} boxesPerRow={4} rowHeight={70}>
        {props.newWords.map((word) => (
          <WordItem key={word.id} id={word.id} content={word.content} />
        ))}
      </GridDropZone>
  );
};

export default DndGroupWords;
