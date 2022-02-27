import React, { useState, useContext, useEffect } from "react";
import styled from "styled-components";
import Button from "../UI/Button";
import DndGroupWords from "./DndGropWord";
import { WordsContext } from "../../store/words-context";
import { Transition } from "react-transition-group";
import { GridContextProvider, swap, move } from "react-grid-dnd";
import Error from "../UI/Error";

const DndSectionStyled = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 79px;
  width: 465px;
  z-index: 1;
`;

interface BgWordItemsProps {
  phraseLength: number;
}

const BgWordItemsWrapper = styled.div<BgWordItemsProps>`
  position: absolute;
  top: ${(props) => `${Math.ceil(props.phraseLength / 5) * 45}px`};
  left: 0;
  width: 465px;
  height: 90px;
  display: grid;
  transform: ${(props) => `-${Math.ceil(props.phraseLength / 5) * 45}px`};
  grid-template-columns: repeat(5, 1fr);
  grid-row-gap: 1fr;
  z-index: -1;
  margin-bottom: 20px;
`;

const BgWordItem = styled.div`
  background-color: #e6e6e6;
  box-shadow: inset 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
  z-index: -1;
  border-radius: 13px;
  padding: 4px 18px 5px 18px;
  margin: 4px 10px 4px 0px;
  width: 78px;
  height: 26px;
`;

const DndSection: React.FC = (props) => {
  const wordsCtx = useContext(WordsContext);
  const [isError, setIsError] = useState<boolean>(false);
  const [isSorting, setIsSorting] = useState<boolean>(false);
  const [isDisableBtn, setIsDisableBtn] = useState<boolean>(true);

  useEffect(() => {
    if (wordsCtx.curPhrase.phrase.phrase.length > 0) {
      setIsDisableBtn(false);
    } else {
      setIsDisableBtn(true);
    }

    // сортировка с задержкой при изменение фразы
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

  // create bg word items
  let bgContent = [];
  for (let i = 0; i < wordsCtx.curPhrase.phraseLength; i++) {
    bgContent.push(<BgWordItem key={i} />);
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

      <BgWordItemsWrapper phraseLength={wordsCtx.curPhrase.phraseLength}>
        {bgContent}
      </BgWordItemsWrapper>
      <Transition in={isError} timeout={1000}>
        {(state) => <Error state={state}>Something wrong!</Error>}
      </Transition>

      <Button isActive={isDisableBtn} clickHandler={checkHandler}>
        Check
      </Button>
    </DndSectionStyled>
  );
};

export default DndSection;
