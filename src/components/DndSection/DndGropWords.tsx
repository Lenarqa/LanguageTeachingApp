import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

interface DndGroupWordsProps {
  droppableId: string;
}

const DndGroupWordsStyled = styled.div`
  border: 1px solid blue;
  min-height: 150px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 10px;
`;

const DndGroupWords: React.FC<DndGroupWordsProps> = (props) => {
  return (
    <Droppable droppableId={props.droppableId}>
      {(provided, snapshot)=>(
      <DndGroupWordsStyled ref={provided.innerRef} {...provided.droppableProps}>
        {props.children}
      </DndGroupWordsStyled>
      )}
    </Droppable>
  );
};

export default DndGroupWords;
