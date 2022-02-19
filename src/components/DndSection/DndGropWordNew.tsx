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
  myDroppableId: string;
}

const DndGroupWordsStyled = styled.div<DndGroupWordsStyledProps>`
  display: flex;
  flex-wrap: wrap;
  width: 482px;
  justify-content: flex-start;
  align-items: flex-start;
  min-height: ${(props) => (props.myDroppableId !== "row-1" ? "38px" : "90px")};
  margin-bottom: 10px;
  background-color: #eee;
  background-image: ${(props) =>
    props.myDroppableId === "row-1"
      ? "linear-gradient(to bottom, rgba(75, 75, 75, 1) 3%, transparent 3%)"
      : ""};
  background-size: ${(props) =>
    props.myDroppableId === "row-1" ? "1px 46%" : ""};
`;

const DndGroupWordsNew: React.FC<DndGroupWordsProps> = (props) => {
  return (
    <Droppable droppableId={props.row.id} direction="horizontal">
      {(provided, snapshot) => (
        <DndGroupWordsStyled
          myDroppableId={props.row.id}
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
