import React from "react";
import styled from "styled-components";
import TextItem from "./TextItem";

const TextSectionStyle = styled.div`
  $border-color: #252525;
  
  position: relative;
  max-width: 60%;
  height: 100%;
  padding: 1rem;
  margin-left: 1rem;
  border: 2px solid #252525;
  border-radius: 10px;

  display: flex;
  justify-content: flex-start;
  align-items: center;
  flex-wrap: wrap;

  &::before {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    left: -19px;
    bottom: 8px;
    border: 10px solid;
    border-color: #252525 transparent transparent #252525;
    transform: rotate(180deg);
  }

  &::after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    left: -14px;
    bottom: 10px;
    border: 8px solid;
    border-color: white transparent transparent white;
    transform: rotate(180deg);
  }
`;

const TextSection: React.FC = (props) => {
  return (
    <TextSectionStyle>
      <TextItem>Hello</TextItem>
      <TextItem>my</TextItem>
      <TextItem>dear</TextItem>
      <TextItem>friend</TextItem>
    </TextSectionStyle>
  );
};

export default TextSection;
