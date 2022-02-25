import React, { useState, useContext } from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import Button from "../UI/Button";
import DndGroupWords from "./DndGropWord";
import { IInitData } from "../../models/models";
import { WordsContext } from "../../store/words-context";
import { IRowNew } from "../../models/models";


const DndSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 79px;
`;

const ErrorText = styled.div`
  font-size: 24px;
  font-weight: 400;
  color: #ff0000;
  max-width: 465px;
  text-align: center;
  margin-bottom: 27px;
  text-shadow: -1px -2px 2px #ffffff, 1px 2px 2px rgba(91, 13, 13, 0.5);
`;

const DndSection: React.FC = (props) => {
  const wordsCtx = useContext(WordsContext);

  const [wordsState, setWordsState] = useState<IInitData>(wordsCtx.curWordData);
  const [isError, setIsError] = useState<boolean>(false);

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

    const startRow = wordsState.rows[source.droppableId];

    const finishRow = wordsState.rows[destination.droppableId];
    

    if (startRow === finishRow) {
      const newWordIds = Array.from(startRow.wordIds);

      newWordIds.splice(source.index, 1);
      newWordIds.splice(destination.index, 0, draggableId);

      const newRow = {
        ...startRow,
        wordIds: newWordIds,
      };

      setWordsState((prev) => {
        return {
          ...prev,
          rows: {
            ...wordsState.rows,
            [newRow.id]: newRow,
          },
        };
      });
      
      return;
    }

    //move between rows
    if (finishRow.wordIds.length > 3) {
      return;
    }
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
      ...wordsState,
      rows: {
        ...wordsState.rows,
        [newStart.id]: newStart,
        [newFinish.id]: newFinish,
      },
    };
    
    setWordsState(newState);

    // console.log(finishRow);
    // если перемещаем из строки фразы в 
    //строку слов то делаем сортировку
    // if(!finishRow.isPhrase){

    // }

  };

  const onDradStartHandler = () => {
    setIsError(false);
  };

  const checkHandler = () => {
    //получаем id слов из строк для ответа
    let userPhraseWordsIds: string[] = [];
    for (let i = 0; i < Object.keys(wordsState.rows).length; i++) {
      if (wordsState.rows[`row-${i}`].isPhrase) {
        userPhraseWordsIds.splice(
          userPhraseWordsIds.length,
          0,
          ...wordsState.rows[`row-${i}`].wordIds
        );
      }
    }

    // получаем слова
    let userWords: string[] = [];
    for (let i = 0; i < userPhraseWordsIds.length; i++) {
      userWords.splice(
        userWords.length,
        0,
        wordsState.words[userPhraseWordsIds[i]].content
      );
    }

    // составляем из слов предложение
    let userPhrase = userWords.join(" ");

    if (userPhrase === wordsState.en) {
      let synth = window.speechSynthesis;
      var utterThis = new SpeechSynthesisUtterance(userPhrase);
      synth.speak(utterThis);
      
      // timeout перед тем как поменять фразу
      //изходя из длинны сообщения
      utterThis.onend = function(event) {
        setTimeout(()=>{
          let newState:IInitData = wordsCtx.changeWord();
          setWordsState(newState);
        }, event.elapsedTime);
      };
    } else {
      setIsError(true);
    }
  };

  return (
    <DragDropContext
      onDragEnd={onDragEndHandlerNew}
      onDragStart={onDradStartHandler}
    >
      <DndSectionStyled>
        {wordsState.rowsOrder.map((rowId: string) => {
          const row = wordsState.rows[rowId];
          const words = row.wordIds.map((wordId) => wordsState.words[wordId]);
          return <DndGroupWords key={row.id} row={row} words={words} />;
        })}
      </DndSectionStyled>
      {isError && <ErrorText>Something wrong!</ErrorText>}
      <Button clickHandler={checkHandler}>Check</Button>
    </DragDropContext>
  );
};

export default DndSection;
