import React, { useRef, useState } from "react";
import styled from "styled-components";

interface IWordItem {
  groupId: number;
  id: number;
  word: string;
  onRefreshList(
    collisionItemGroupId: number,
    collisionItemId: number,
    currentItemGroupId: number,
    currentItemId: number
  ): void;
}

const WordItemStyled = styled.div`
  cursor: pointer;
  border: 1px solid #c9c9c9;
  box-sizing: border-box;
  box-shadow: 0px 8px 4px -6px rgba(0, 0, 0, 0.25);
  border-radius: 13px;
  padding: 4px 18px 5px 18px;
  margin-left: 10px;
`;

const WordItem: React.FC<IWordItem> = (props) => {
//   const dragItem = useRef<{ groupId: number; id: number }>({
//     groupId: 1000,
//     id: 1000,
//   });
  const [dragItem, setDragItem] = useState<{ groupId: number; id: number }>({ groupId: props.groupId, id:  props.id });
  const dragNode = useRef<EventTarget>();

  const dragStartHandler = (
    e: React.DragEvent<HTMLDivElement>,
    groupId: number,
    id: number
  ) => {
    console.log("Drag starting item - " + groupId, id);
    // dragItem.current = { groupId, id };
    setDragItem({groupId, id})
    dragNode.current = e.target;
    dragNode.current.addEventListener("dragend", dragEndHandler);
    // console.log(dragItem.current);
  };

  const dragEndHandler = (e: Event) => {
    dragNode.current?.removeEventListener("dragend", dragEndHandler);
    // dragItem.current = { groupId: 1000, id: 1000 }; //обнуление
    setDragItem({ groupId: 1000, id: 1000 }); //обнуление
    dragNode.current = undefined;
  };

  const dragEnterHandler = (
    e: React.DragEvent<HTMLDivElement>,
    targetGroupId: number,
    targetId: number
  ) => {
    // console.log("Entering - " + targetGroupId, targetId);
    
    if (e.target !== dragNode.current) {
      props.onRefreshList(
        // dragItem.current.groupId,
        // dragItem.current.id,
        dragItem.groupId,
        dragItem.id,
        targetGroupId,
        targetId
      );
    //   dragItem.current = {  groupId:targetGroupId, id: targetId }
    setDragItem({  groupId:targetGroupId, id: targetId });
    }
  };

  return (
    <WordItemStyled
      draggable={true}
      onDragStart={(event) => dragStartHandler(event, props.groupId, props.id)}
      onDragEnter={(e) => dragEnterHandler(e, props.groupId, props.id)}
    >
      {props.word}
    </WordItemStyled>
  );
};

export default WordItem;
