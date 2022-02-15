import React from "react";
import styled from "styled-components";
import User from "./User";

const ShowTextDiv = styled.div`
  border: 1px solid green;
  min-height: 9rem;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  padding: 1rem;
`;

const ShowText: React.FC = (props) => {
  return (
    <ShowTextDiv>
      <User />
      <div>Hello my dear friend</div>
    </ShowTextDiv>
  );
};

export default ShowText;
