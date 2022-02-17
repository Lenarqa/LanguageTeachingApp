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
  /* transform: fi; */
  /* height: 20rem; */
`;

const DndSection: React.FC = (props) => {
  const [columns, setColumns] = useState(New_Dummy_ARRAY);

  const dragEndHandler = (result: DropResult) => {
    if (!result.destination) return;
    const { source, destination } = result;
    if (source.droppableId !== destination.droppableId) {
      const sourceColumn = columns[source.droppableId];
      const destColumn = columns[destination.droppableId];
      const sourceItems = [...sourceColumn.items];
      const destItems = [...destColumn.items];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    } else {
      const column = columns[source.droppableId]; // не смог исправить ошибку
      // console.log(column);
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };

  return (
    <DndSectionStyled>
      <DragDropContext onDragEnd={dragEndHandler}>
        {Object.entries(columns).map(([id, column]) => {
          return (
            <DndGroupWords key={id}>
              <Droppable droppableId={id}>
                {(provider, snapshot) => {
                  return (
                    <div
                      {...provider.droppableProps}
                      ref={provider.innerRef}
                      style={{
                        display: "flex",
                        flexDirection: "row",
                        flexWrap: "wrap",
                        background: snapshot.isDraggingOver
                          ? "lightblue"
                          : "lightgrey",
                        padding: 4,
                        width: "100%",
                        minHeight: 100,
                        // transform: `translateY(0) translateX(0) tranlateZ(0)`
                      }}
                    >
                      {column.items.map((item, index) => {
                        return (
                          <Draggable
                            key={item.id}
                            draggableId={item.id.toString()}
                            index={index}
                          >
                            {(provider, snapshot) => {
                              return (
                                <div
                                  ref={provider.innerRef}
                                  {...provider.draggableProps}
                                  {...provider.dragHandleProps}
                                >
                                  <WordItem word={item.content} />
                                </div>
                              );
                            }}
                          </Draggable>
                        );
                      })}
                      {provider.placeholder}
                    </div>
                  );
                }}
              </Droppable>
            </DndGroupWords>
          );
        })}
      </DragDropContext>

      {/* {list.map((groupId, groupI) => (
        <DndGroupWords key={groupI}>
          {list[groupI].items.map((word, wordI) => (
            <WordItem
              key={wordI}
              groupId={groupI}
              id={wordI}
              word={word}
              onRefreshList={refreshListsHandler}
            />
          ))}
        </DndGroupWords>
      ))} */}
    </DndSectionStyled>
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
