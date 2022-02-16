import React from "react";
import styled from "styled-components";

const DndGroupWordsStyled = styled.div`
  border: 1px solid blue;
  height: 50%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
`;

const dropHandler = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
  const data = e.dataTransfer.getData("text");
  // console.log(data + " from ");

  // setContent(data);
};

const allowDrop = (e: React.DragEvent<HTMLDivElement>) => {
  e.preventDefault();
};

const DndGroupWords: React.FC = (props) => {
  return (
    <DndGroupWordsStyled onDragOver={allowDrop} onDrop={dropHandler}>
      {props.children}
    </DndGroupWordsStyled>
  );
};

export default DndGroupWords;
