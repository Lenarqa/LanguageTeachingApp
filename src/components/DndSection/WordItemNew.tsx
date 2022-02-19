import React from "react";
import { Draggable } from "react-beautiful-dnd";

import styled from "styled-components";
import { IWordNew } from "../../models/models";

interface WordItemProps {
  index: number;
  word: IWordNew;
}

interface WordItemStyledProps {
  isDragging: boolean;
}

const WordItemStyled = styled.div<WordItemStyledProps>`
  cursor: pointer;
  background: #fff;
  border: 1px solid #c9c9c9;
  box-sizing: border-box;
  box-shadow: 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
  border-radius: 13px;
  padding: 4px 18px 5px 18px;
  margin: 4px 10px 4px 0px;
`;

const WordItemNew: React.FC<WordItemProps> = (props) => {
  return (
    <Draggable draggableId={props.word.id} index={props.index}>
      {(provided, snapshot) => (
        <WordItemStyled
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          isDragging={snapshot.isDragging}
        >
          {props.word.content}
        </WordItemStyled>
      )}
    </Draggable>
  );
};

export default WordItemNew;
