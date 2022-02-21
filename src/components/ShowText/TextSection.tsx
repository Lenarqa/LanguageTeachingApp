import React from "react";
import styled from "styled-components";
import TextItem from "./TextItem";

const myBorderColor = "#252525";

const TextSectionStyle = styled.div`
  position: relative;
  max-width: 60%;
  height: 100%;
  padding: 1rem;
  margin-left: 1rem;
  border: 2px solid ${myBorderColor};
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
    border-color: ${myBorderColor} transparent transparent ${myBorderColor};
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
    border-color: #E5E5E5 transparent transparent #E5E5E5;;
    transform: rotate(180deg);
  }
`;

interface TextSectionProps {
  items: string[];
}

const TextSection: React.FC<TextSectionProps> = (props) => {
  return (
      <TextSectionStyle>
        {props.items.map((word:string, index) => <TextItem key={index}>{word}</TextItem>)}
      </TextSectionStyle>
  );
};

export default TextSection;
