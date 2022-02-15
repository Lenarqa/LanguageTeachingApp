import React from "react";
import styled from "styled-components";

const TextItemStyled = styled.p`
  padding-left: 10px;
  font-size: 18px;
  text-decoration: underline dotted;
`;

const TextItem: React.FC = (props) => {
  return <TextItemStyled>{props.children}</TextItemStyled>;
};

export default TextItem;
