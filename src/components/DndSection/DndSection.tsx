import React, { useState } from "react";
import styled from "styled-components";

import { DragDropContext, DropResult } from "react-beautiful-dnd";

import WordItem from "./WordItem";
import DndGroupWords from "./DndGropWords";
import { IWord } from "../../models/models";

const DndSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  justify-content: center;
  min-height: 300px;
  background-color: violet;
`;

const DndSection: React.FC = (props) => {
  const [phrase, setPhrase] = useState<IWord[]>([]);
  const [words, setWords] = useState<IWord[]>(DUMMY_WORDS);
  
  const onDragEndHandler = (result: DropResult) => {
    const { destination, source } = result;

    // console.log(result);

    if (!destination) {
      return;
    }

    if (      
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      console.log("Тоже самое место");
      return;
    }

    let add;
    let active = Array.from(words);
    let complete = Array.from(phrase);
    // console.log(active);
    
    // Source Logic
    if (source.droppableId === "words") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    // Destination Logic
    if (destination.droppableId === "words") {
      active.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setPhrase(complete);
    setWords(active);
  };

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <DndSectionStyled>
        <DndGroupWords droppableId="phrase">
          {phrase.map((wordItem, index) => (
            <WordItem
              index={index}
              key={wordItem.id}
              id={wordItem.id}
              word={wordItem.word}
            />
          ))}
        </DndGroupWords>
        <DndGroupWords droppableId="words">
          {words.map((wordItem, index) => (
            <WordItem
              key={wordItem.id}
              index={index}
              id={wordItem.id}
              word={wordItem.word}
            />
          ))}
        </DndGroupWords>
      </DndSectionStyled>
    </DragDropContext>
  );
};

export default DndSection;

const DUMMY_WORDS: IWord[] = [
  {
    id: 1,
    word: "Hello",
  },
  {
    id: 2,
    word: "my",
  },
  {
    id: 3,
    word: "dear",
  },
  {
    id: 4,
    word: "friend!",
  },
];
