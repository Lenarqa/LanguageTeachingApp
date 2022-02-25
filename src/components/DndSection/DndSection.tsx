import React, { useState, useContext } from "react";
import styled from "styled-components";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import Button from "../UI/Button";
import DndGroupWords from "./DndGropWord";
import { IInitData } from "../../models/models";
import { WordsContext } from "../../store/words-context";
import { IRowNew } from "../../models/models";

import {
  GridContextProvider,
  GridDropZone,
  GridItem,
  swap,
  move,
} from "react-grid-dnd";

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

  const [newWordsState, setNewWordsState] = useState<IPhraseOptions>(dummyData);

  const checkHandler = () => {
    // составляем из слов предложение
    let userPhrase = newWordsState["phrase"].map(word => word.content).join(' ');

    console.log(userPhrase);

    let synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(userPhrase);
    synth.speak(utterThis);

    // if (userPhrase === wordsState.en) {
    //   let synth = window.speechSynthesis;
    //   var utterThis = new SpeechSynthesisUtterance(userPhrase);
    //   synth.speak(utterThis);

    //   // timeout перед тем как поменять фразу
    //   //изходя из длинны сообщения
    //   utterThis.onend = function (event) {
    //     // setTimeout(() => {
    //     //   let newState: IInitData = wordsCtx.changeWord();
    //     //   setWordsState(newState);
    //     // }, event.elapsedTime);
    //   };
    // } else {
    //   setIsError(true);
    // }
  };

  function onChange(
    sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    targetId?: string | undefined
  ) {
    if (targetId) {
      const result = move(
        newWordsState[sourceId],
        newWordsState[targetId],
        sourceIndex,
        targetIndex
      );
      return setNewWordsState({
        ...newWordsState,
        [sourceId]: result[0],
        [targetId]: result[1],
      });
    }

    const result = swap(newWordsState[sourceId], sourceIndex, targetIndex);
    return setNewWordsState({
      ...newWordsState,
      [sourceId]: result,
    });
  }

  return (
    <GridContextProvider onChange={onChange}>
      <DndSectionStyled>
        <DndGroupWords id={"phrase"} newWords={newWordsState.phrase} />
        <DndGroupWords id={"words"} newWords={newWordsState.words} />
        <Button clickHandler={checkHandler}>Check</Button>
      </DndSectionStyled>
    </GridContextProvider>
  );
};

export default DndSection;

interface newIWord {
  id: number;
  position: number;
  content: string;
}

interface IPhrase {
  phrase: newIWord[];
  words: newIWord[];
}

interface IPhraseOptions {
  [key: string]: newIWord[];
}

const dummyData: IPhraseOptions = {
  phrase: [],
  words: [
    { id: 1, position: 1, content: "Hello" },
    { id: 2, position: 2, content: "my" },
    { id: 3, position: 3, content: "dear" },
    { id: 4, position: 4, content: "friend." },
    { id: 5, position: 5, content: "Cold" },
    { id: 6, position: 6, content: "day" },
    { id: 7, position: 7, content: "today" },
  ],
};
