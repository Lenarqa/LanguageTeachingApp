import React from "react";
import styled from "styled-components";

interface ErrorTextProps {
  state: string;
}

const ErrorText = styled.div<ErrorTextProps>`
  font-size: 24px;
  font-weight: 400;
  color: #ff0000;
  max-width: 465px;
  text-align: center;
  text-shadow: -1px -2px 2px #ffffff, 1px 2px 2px rgba(91, 13, 13, 0.5);
  transition: all 1s ease-in-out;
  opacity: ${(props) =>
    props.state === "entering" || props.state === "entered" ? 1 : 0};
  margin-bottom: ${(props) =>
    props.state === "entering" || props.state === "entered" ? "27px" : 0}; ;
`;

interface ErrorProps {
  state: string;
}

const Error: React.FC<ErrorProps> = (props) => {
  return <ErrorText state={props.state}>{props.children}</ErrorText>;
};

export default Error;