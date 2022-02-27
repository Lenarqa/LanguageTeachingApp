import React from "react";
import styled from "styled-components";

interface ButtonStyledProps {
  isActive: boolean;
}

const ButtonStyled = styled.button<ButtonStyledProps>`
  cursor: pointer;
  padding: 23px 209px 24px 210px;
  font-size: 18px;
  background-image: linear-gradient(91.2deg, #ffffff 0%, #f2f2f2 100%);
  border: none;
  border-radius: 88px;
  text-align: center;
  color: ${(props) => (props.isActive ? "#8c7878" : "black")};
  position: relative;

  &::after {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 88px;
    box-shadow: -2px -4px 8px #ffffff, 2px 4px 8px rgba(0, 0, 0, 0.2);

    opacity: 1;
    transition: opacity 0.7s;
  }

  &::before {
    content: " ";
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    border-radius: 88px;
    box-shadow: inset -2px -4px 12px #ffffff,
      inset 2px 4px 8px rgba(0, 0, 0, 0.2);

    opacity: 0;
    transition: opacity 0.7s;
  }

  &:hover::before {
    opacity: 1;
  }

  &:hover::after {
    opacity: 0;
  }
`;

interface ButtonProps {
  isActive: boolean;
  clickHandler: () => void;
}

const Button: React.FC<ButtonProps> = (props) => {
  return (
    <ButtonStyled
      disabled={props.isActive}
      isActive={props.isActive}
      onClick={props.clickHandler}
    >
      {props.children}
    </ButtonStyled>
  );
};

export default Button;
