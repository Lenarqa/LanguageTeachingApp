import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";

interface DndGroupWordsProps {
  droppableId: string;
}

const DndGroupWordsStyled = styled.div`
  border: 1px solid blue;
  background-color: aliceblue;
  min-height: 150px;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  min-width: 482px;
  min-height: 90px;
  margin-bottom: 10px;
`;

const DndGroupWords: React.FC<DndGroupWordsProps> = (props) => {
  return (
    <Droppable droppableId={props.droppableId} direction="horizontal">
      {(provided, snapshot)=>(
      <DndGroupWordsStyled ref={provided.innerRef} {...provided.droppableProps}>
        {props.children}
        {provided.placeholder}
      </DndGroupWordsStyled>
      )}
    </Droppable>
  );
};

export default DndGroupWords;
