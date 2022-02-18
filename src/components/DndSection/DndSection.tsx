import { title } from "process";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import {
  DragDropContext,
  Draggable,
  Droppable,
  DropResult,
} from "react-beautiful-dnd";

import WordItem from "./WordItem";
import DndGroupWords from "./DndGropWords";

const DndSectionStyled = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid black;
  justify-content: center;
  min-height: 300px;
`;

const DndSection: React.FC = (props) => {
  const onDragEndHandler = (result: DropResult) => {
    console.log("onDragEndHandler");
  }

  return (
    <DragDropContext onDragEnd={onDragEndHandler}>
      <DndSectionStyled>
          <DndGroupWords droppableId="phrase">
            
          </DndGroupWords>
          <DndGroupWords droppableId="words">
              <WordItem id="1" index={1}>Hello</WordItem>
          </DndGroupWords>
      </DndSectionStyled>
    </DragDropContext>
  );
};

export default DndSection;

interface IContent {
  id: number;
  content: string;
}

const newItems: IContent[] = [
  {
    id: 1,
    content: "Hello",
  },
  {
    id: 2,
    content: "my",
  },
  {
    id: 3,
    content: "dear",
  },
  {
    id: 4,
    content: "friend",
  },
  {
    id: 5,
    content: "dear",
  },
  {
    id: 6,
    content: "friend",
  },
  {
    id: 7,
    content: "dear",
  },
  {
    id: 8,
    content: "friend",
  },
  {
    id: 9,
    content: "dear",
  },
  {
    id: 10,
    content: "friend",
  },
];

const New_Dummy_ARRAY = {
  [1]: {
    name: "Todo",
    items: [],
  },
  [2]: {
    name: "inProgress",
    items: newItems,
  },
};
