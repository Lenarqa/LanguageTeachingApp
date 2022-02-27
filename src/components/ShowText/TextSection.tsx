import React from "react";
import styled from "styled-components";
import TextItem from "./TextItem";

// const myBorderColor = 
interface TextSectionStyleProps {
  myBorderColor: string;
}

const TextSectionStyle = styled.div<TextSectionStyleProps>`
  position: relative;
  max-width: 60%;
  height: 100%;
  padding: 1rem;
  margin-left: 1rem;
  border: ${props =>  `2px solid ${props.myBorderColor}`};
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
    top: 49px;
    border: 9px solid;
    border-color: ${props => `${props.myBorderColor} transparent transparent ${props.myBorderColor}`};
    transform: rotate(180deg);
  }

  &::after {
    content: " ";
    position: absolute;
    width: 0;
    height: 0;
    left: -14px;
    top: 48px;
    border: 8px solid;
    border-color: #f5f5f5 transparent transparent #f5f5f5; 
    transform: rotate(180deg);
  }
`;

interface TextSectionProps {
  items: string[];
}

const TextSection: React.FC<TextSectionProps> = (props) => {
  return (
      <TextSectionStyle myBorderColor={"#252525"}>
        {props.items.map((word:string, index) => <TextItem key={index}>{word}</TextItem>)}
      </TextSectionStyle>
  );
};

export default TextSection;
