import React from "react";
import { Draggable } from "react-beautiful-dnd";

import styled from "styled-components";

interface WordItemProps {
  id: number,
  index:number,
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

const WordItem: React.FC<WordItemProps> = (props) => {
  return (
    <Draggable draggableId={props.id.toString()} index={props.index}>
      {(provided, snapshot) => (
        <WordItemStyled
          ref={provided.innerRef}
          {...provided.dragHandleProps}
          {...provided.draggableProps}
          style={{...provided.draggableProps?.style}}
        >
          {props.word}
        </WordItemStyled>
      )}
    </Draggable>
  );
};

export default WordItem;
