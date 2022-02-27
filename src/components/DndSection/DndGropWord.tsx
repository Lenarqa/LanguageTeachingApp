import React, { useContext } from "react";
import styled from "styled-components";
import { IWord } from "../../models/models";
import WordItem from "./WordItem";
import { GridDropZone } from "react-grid-dnd";
import { WordsContext } from "../../store/words-context";

const DndGroupWordsWrapper = styled.div`
  position: relative;
  z-index: 0;
`;

interface DndGroupWordsProps {
  id: string;
  newWords: IWord[];
}

const DndGroupWords: React.FC<DndGroupWordsProps> = (props) => {
  const wordsCtx = useContext(WordsContext);
  let style = {};

  if (props.id === "phrase") {
    style = {
      width: "100%",
      //динамически задаем количество строк в зависимости от кол-ва элементов
      // в строке по 5 элементов высота строки 45px
      height: `${Math.ceil(wordsCtx.curPhrase.phraseLength / 5)*45}px`,
      // линии заднего фона
      backgroundImage:
        "linear-gradient(rgba(75, 75, 75, 1),rgba(75, 75, 75, 1) 5%, transparent 5%, transparent)",
      backgroundSize: "100% 40px",
    };
  } else {
    style = {
      width: "100%",
      height: `${Math.ceil(wordsCtx.curPhrase.phraseLength / 5)*45}px`,
      marginBottom: "20px",
    };
  }

  return (
    <DndGroupWordsWrapper>
      <GridDropZone style={style} id={props.id} boxesPerRow={5} rowHeight={42}>
        {props.newWords.map((word) => (
          <WordItem key={word.id} id={word.id} content={word.content} />
        ))}
      </GridDropZone>
    </DndGroupWordsWrapper>
  );
};

export default DndGroupWords;
