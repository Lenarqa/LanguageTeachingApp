import React from "react";
import styled from "styled-components";

const DndGroupWordsStyled = styled.div`
  border: 1px solid blue;
  height: 50%;

  display: flex;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
  margin: 10px;
`;

const DndGroupWords: React.FC = (props) => {
  return (
    <DndGroupWordsStyled>
      {props.children}
    </DndGroupWordsStyled>
  );
};

export default DndGroupWords;
