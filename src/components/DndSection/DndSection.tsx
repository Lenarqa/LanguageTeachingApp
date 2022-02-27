import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Button from "../UI/Button";
import DndGroupWords from "./DndGropWord";
import { WordsContext } from "../../store/words-context";
import { Transition } from 'react-transition-group';

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

interface GridTestWrapperProps {
  phraseLength: number;
}

const GridTestWrapper = styled.div<GridTestWrapperProps>`
  position: absolute;
  top: ${(props) => `${Math.ceil(props.phraseLength / 5)*45}px`};
  left: 0;
  width: 465px;
  height: 90px;
  display: grid;
  transform: ${(props) => `-${Math.ceil(props.phraseLength / 5)*45}px`};
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1fr;
  z-index: -1;
  margin-bottom: 20px;
`;

const WordItemWrapper = styled.div`
  background-color: rgba(229, 229, 229, 1);
  box-shadow: inset 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
  z-index: -1;
  border-radius: 13px;
  padding: 4px 18px 5px 18px;
  margin: 4px 10px 4px 0px;
  width: 78px;
  height: 26px;
`;

interface ErrorTextProps {
  state: string;
}

const ErrorText = styled.div<ErrorTextProps>`
  font-size: 24px;
  font-weight: 400;
  color: #ff0000;
  max-width: 465px;
  text-align: center;
  text-shadow: -1px -2px 2px #ffffff, 1px 2px 2px rgba(91, 13, 13, 0.5);
  transition: all 1s ease-in-out;
  opacity: ${props => props.state === "entering" || props.state === "entered" ? 1 : 0};
  margin-bottom: ${props => props.state === "entering" || props.state === "entered" ? "27px" : 0};;
`;

const DndSection: React.FC = (props) => {
  const wordsCtx = useContext(WordsContext);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSorting, setIsSorting] = useState<boolean>(false);

  // сортировка с задержкой
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

  // create bg items
  let bgContent = [];
  for (let i = 0; i < wordsCtx.curPhrase.phraseLength; i++) {
    bgContent.push(<WordItemWrapper key={i} />);
  }

  const transitionStyles = {
    entering: { opacity: 1 },
    entered:  { opacity: 1 },
    exiting:  { opacity: 0 },
    exited:  { opacity: 0 },
  };

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

      <GridTestWrapper phraseLength={wordsCtx.curPhrase.phraseLength}>
        {bgContent}
      </GridTestWrapper>
      <Transition in={isError} timeout={1000}>
        {state => (
          <ErrorText state={state}>Something wrong!</ErrorText>
        )}
      </Transition>
      <Button clickHandler={checkHandler}>Check</Button>
    </DndSectionStyled>
  );
};

const ErrorTextWrapper = styled.div`
  height: 112px;
`

export default DndSection;
