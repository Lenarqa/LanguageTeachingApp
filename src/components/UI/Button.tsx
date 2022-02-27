import React from "react";
import styled from "styled-components";

interface ButtonProps {
  clickHandler: () => void;
}

const ButtonStyled = styled.button`
  cursor: pointer;
  padding: 23px 209px 24px 210px;
  font-size: 18px;
  background: linear-gradient(91.2deg, #ffffff 0%, #f2f2f2 100%);
  box-shadow: -2px -4px 8px #ffffff, 2px 4px 8px rgba(0, 0, 0, 0.2);
  border: none;
  border-radius: 88px;
  text-align: center;
  transition: all 3s ease;
  
  &:hover {
    background: linear-gradient(91.2deg, #FFFFFF 0%, #F2F2F2 100%);
    box-shadow: inset -2px -4px 12px #FFFFFF, inset 2px 4px 8px rgba(0, 0, 0, 0.2);
    border-radius: 88px;
  }
`;

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonStyled onClick={props.clickHandler}>{props.children}</ButtonStyled>
  );
};

export default Button;
