import React, { useState, useContext } from "react";
import styled from "styled-components";

import { DragDropContext, DropResult } from "react-beautiful-dnd";
import Button from "../UI/Button";
import DndGroupWordsNew from "./DndGropWordNew";
import { IInitData } from "../../models/models";
import { WordsContext } from "../../store/words-context";

const DndSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 79px;
`;

const DndSection: React.FC = (props) => {
  const wordsCtx = useContext(WordsContext);
  
  const [myState, setMyState] = useState<IInitData>(wordsCtx.curWordData);

  const onDragEndHandlerNew = (result: DropResult) => {
    const { destination, source, draggableId } = result;

    if (!destination) {
      return;
    }

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const startRow = myState.rows[source.droppableId];
    
    const finishRow = myState.rows[destination.droppableId];
    if(finishRow.wordIds.length > 3) {
      return;
    }
    

    if (startRow === finishRow) {
      const newWordIds = Array.from(startRow.wordIds);

      newWordIds.splice(source.index, 1);
      newWordIds.splice(destination.index, 0, draggableId);

      const newRow = {
        ...startRow,
        wordIds: newWordIds,
      };

      setMyState((prev) => {
        return {
          ...prev,
          rows: {
            ...myState.rows,
            [newRow.id]: newRow,
          },
        };
      });
      return;
    }

    //move between rows
    const startWordIds = Array.from(startRow.wordIds);
    startWordIds.splice(source.index, 1);
    const newStart = {
      ...startRow,
      wordIds: startWordIds,
    };

    const finishWordIds = Array.from(finishRow.wordIds);
    finishWordIds.splice(destination.index, 0, draggableId);
    const newFinish = {
      ...finishRow,
      wordIds: finishWordIds,
    };

    const newState = {
      ...myState,
      rows: {
        ...myState.rows,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };

    setMyState(newState);
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandlerNew}>
      <DndSectionStyled>
        {myState.rowsOrder.map((rowId: string) => {
          const row = myState.rows[rowId];
          const words = row.wordIds.map((wordId) => myState.words[wordId]);
          return <DndGroupWordsNew key={row.id} row={row} words={words} />;
        })}
      </DndSectionStyled>
      <Button clickHandler={() => console.log("Click")}>Check</Button>
    </DragDropContext>
  );
};

export default DndSection;
