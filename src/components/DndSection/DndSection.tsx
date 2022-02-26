import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";

import Button from "../UI/Button";
import DndGroupWords from "./DndGropWord";
import { WordsContext } from "../../store/words-context";

import { GridContextProvider, swap, move } from "react-grid-dnd";

const DndSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 79px;
  width: 465px;
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
  const [isError, setIsError] = useState<boolean>(false);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  useEffect(()=>{
    setTimeout(() => {
      wordsCtx.setCurPhrase((prev) => {
        prev.phrase.words.sort((a, b) => a.position - b.position);
        return prev;
      });
      setIsSorting(true);
      setTimeout(()=>{
        setIsSorting(false);
      }, 1000)
    }, 1000);
  },[wordsCtx]);

  const checkHandler = () => {
    let userPhrase = wordsCtx.curPhrase.phrase["phrase"]
      .map((word) => word.content)
      .join(" ");

    if (userPhrase === wordsCtx.curPhrase.en) {
      let synth = window.speechSynthesis;
      var utterThis = new SpeechSynthesisUtterance(userPhrase);
      synth.speak(utterThis);

      // timeout перед тем как поменять фразу
      //изходя из длинны сообщения
      utterThis.onend = function (event) {
        setTimeout(() => {
          wordsCtx.changeWord();
        }, event.elapsedTime);
      };
    } else {
      setIsError(true);
    }
  };

  function onChange(
    sourceId: string,
    sourceIndex: number,
    targetIndex: number,
    targetId?: string | undefined
  ) {
    setIsError(false);
    if (targetId) {
      const result = move(
        wordsCtx.curPhrase.phrase[sourceId],
        wordsCtx.curPhrase.phrase[targetId],
        sourceIndex,
        targetIndex
      );
      return wordsCtx.setCurPhrase((prev) => ({
        ...prev,
        phrase: {
          [sourceId]: result[0],
          [targetId]: result[1],
        },
      }));
    }

    const result = swap(
      wordsCtx.curPhrase.phrase[sourceId],
      sourceIndex,
      targetIndex
    );
    return wordsCtx.setCurPhrase((prev) => ({
      ...prev,
      phrase: {
        ...prev.phrase,
        [sourceId]: result,
      },
    }));
  }

  return (
    <DndSectionStyled>
      <GridContextProvider onChange={onChange}>
        <DndGroupWords
          id={"phrase"}
          newWords={wordsCtx.curPhrase.phrase.phrase}
        />
        <DndGroupWords
          id={"words"}
          newWords={wordsCtx.curPhrase.phrase.words}
        />
        {isError && <ErrorText>Something wrong!</ErrorText>}
        <Button clickHandler={checkHandler}>Check</Button>
      </GridContextProvider>
    </DndSectionStyled>
  );
};

export default DndSection;
