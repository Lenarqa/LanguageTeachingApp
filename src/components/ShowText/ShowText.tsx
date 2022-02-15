import React from "react";
import styled from "styled-components";
import TextSection from "./TextSection";
import User from "./User";

const ShowTextDiv = styled.div`
  min-height: 9rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
`;

const ShowText: React.FC = (props) => {
  return (
    <ShowTextDiv>
      <User />
      <TextSection/>
    </ShowTextDiv>
  );
};

export default ShowText;
