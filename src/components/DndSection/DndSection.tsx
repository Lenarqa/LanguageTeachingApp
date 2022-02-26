import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import { IWord } from "../../models/models";
import Button from "../UI/Button";
import DndGroupWords from "./DndGropWord";
import { WordsContext } from "../../store/words-context";

import { GridContextProvider, swap, move } from "react-grid-dnd";

const DndSectionStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 79px;
  width: 465px;
  z-index: 1;
`;

const GridTestWrapper = styled.div`
  /* background-color: lightblue; */
  position: absolute;
  top: 50%;
  left: 0;
  width: 465px;
  height: 90px;
  display: grid;
  transform: translateY(-50%);
  grid-template-columns: repeat(5, 1fr);
  z-index: -1;
`;

const WordItemWrapper = styled.div`
  /* background: #e6e6e6; */
  background-color: red;
  z-index: -1;
  border-radius: 13px;
  padding: 4px 18px 5px 18px;
  margin: 4px 10px 4px 0px;
  width: 78px;
  height: 26px;
  /* box-shadow: inset 0px 8px 4px -6px rgba(0, 0, 0, 0.25); */
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

  const [bgItems, setBgItems] = useState<IWord[]>([] as IWord[]);
  useEffect(() => {
    // глубокое копирование.
    setBgItems(JSON.parse(JSON.stringify(wordsCtx.curPhrase.phrase.words)));
  }, []);

  useEffect(() => {
    setTimeout(() => {
      wordsCtx.setCurPhrase((prev) => {
        prev.phrase.words.sort((a, b) => a.position - b.position);
        return prev;
      });
      setIsSorting(true);
      setTimeout(() => {
        setIsSorting(false);
      }, 1000);
    }, 1000);
  }, [wordsCtx]);

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
      </GridContextProvider>

      <GridTestWrapper>
        {bgItems.map((item, index) => (
          <WordItemWrapper key={index} />
        ))}
      </GridTestWrapper>

      {isError && <ErrorText>Something wrong!</ErrorText>}
      <Button clickHandler={checkHandler}>Check</Button>
    </DndSectionStyled>
  );
};

export default DndSection;
