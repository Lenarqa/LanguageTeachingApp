import React, { useState, useContext, useEffect } from "react";
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
  console.log(wordsCtx);
  
  const [myState, setMyState] = useState<IInitData>(wordsCtx.words[0]);

  // useEffect(() => {
  //   setMyState(wordsCtx.words[0]);
  // }, [wordsCtx]);

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

const initData = {
  words: {
    "word-1": { id: "word-1", content: "Hello" },
    "word-2": { id: "word-2", content: "my" },
    "word-3": { id: "word-3", content: "dear" },
    "word-4": { id: "word-4", content: "friend" },
  },
  rows: {
    "row-1": {
      id: "row-1",
      isPhrase: true,
      wordIds: [],
    },
    "row-2": {
      id: "row-2",
      isPhrase: true,
      wordIds: [],
    },
    "row-3": {
      id: "row-3",
      isPhrase: false,
      wordIds: ["word-1", "word-2", "word-3", "word-4"],
    },
  },
  rowsOrder: ["row-1", "row-2", "row-3"],
  ru:"hello",
};
