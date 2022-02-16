import React from "react";
import styled from "styled-components";
import WordItem from "./WordItem";

const DndSectionStyled = styled.div`
  border: 1px solid black;
  height: 20rem;
`;

const DndGroup = styled.div`
  border: 1px solid green;
  height: 50%;
`;

const DndGroupWords = styled.div`
  border: 1px solid blue;
  height: 50%;
`;

const DndSection: React.FC = (props) => {
  return (
    <DndSectionStyled>
      <DndGroup>место куда перетаскивать</DndGroup>
      <DndGroupWords>
        {DUMMY_ARRAY.map((word) => (
          <WordItem word={word} />
        ))}
      </DndGroupWords>
    </DndSectionStyled>
  );
};

export default DndSection;

const DUMMY_ARRAY = ["Hello", "my", "dear", "friend"];
