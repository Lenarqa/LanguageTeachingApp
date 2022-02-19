import React from "react";
import { Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { IRowNew, IWordNew } from "../../models/models";
import WordItemNew from "./WordItemNew";

interface DndGroupWordsProps {
  row: IRowNew;
  words: IWordNew[];
}

interface DndGroupWordsStyledProps {
  isDraggingOver: boolean;
  isPhrase: boolean;
//   myDroppableId: string;
}

const DndGroupWordsStyled = styled.div<DndGroupWordsStyledProps>`
  display: flex;
  flex-wrap: wrap;
  width: 482px;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: 38px;
  margin-bottom: 10px;
  background-color: #eee;
  border-bottom: ${props => props.isPhrase ? "1px solid #4B4B4B;":""};
`;

const DndGroupWordsNew: React.FC<DndGroupWordsProps> = (props) => {
  return (
    <Droppable droppableId={props.row.id} direction="horizontal">
      {(provided, snapshot) => (
        <DndGroupWordsStyled
            isPhrase={props.row.isPhrase}
        //   myDroppableId={props.row.id}
          isDraggingOver={snapshot.isDraggingOver}
          ref={provided.innerRef}
          {...provided.droppableProps}
        >
          {props.words.map((word, index) => (
            <WordItemNew key={word.id} word={word} index={index} />
          ))}
          {provided.placeholder}
        </DndGroupWordsStyled>
      )}
    </Droppable>
  );
};

export default DndGroupWordsNew;
