import { title } from "process";
import React, { useState, useRef, useEffect } from "react";
import styled from "styled-components";

import WordItem from "./WordItem";
import DndGroupWords from "./DndGropWords";

const DndSectionStyled = styled.div`
  border: 1px solid black;
  height: 20rem;
`;

const DndSection: React.FC = (props) => {
  const [list, setList] = useState(DUMMY_ARRAY);
  const [dragging, setDragging] = useState(false);

  const refreshListsHandler = (
    curGroupId: number,
    curId: number,
    targetGroupId: number,
    targetId: number
  ) => {
    if (
      targetGroupId === 1000 ||
      targetId === 1000 ||
      curGroupId === 1000 ||
      curId === 1000
    ) {
      console.log("Govno");
      return;
    }
    console.log("0000000000000000000000");
    console.log(curGroupId, curId + " current");
    console.log(targetGroupId, targetId + " target");
    console.log("0000000000000000000000");

    // setList((prev) => {
    //   let newList = JSON.parse(JSON.stringify(prev)); // глубокая копия массива если делать через [...prev] то появляется лишний элемент

    //   newList[targetGroupId].items.splice(
    //     targetId,
    //     0,
    //     newList[curGroupId].items.splice(curId, 1)[0]
    //   );
    //   // dragItem.current = dragItemParams;
    //   return newList;
    // });
  };

  return (
    <DndSectionStyled>
      {list.map((groupId, groupI) => (
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
      ))}
    </DndSectionStyled>
  );
};

export default DndSection;

const DUMMY_ARRAY = [
  { groupId: 1, items: ["Yellow"] },
  { groupId: 2, items: ["Hello", "my", "dear", "friend"] },
];
