import React from "react";
import styled from 'styled-components';


const HelloStyled = styled.h2 `
  color: ${props => props.color == "1" ? "Green" : "red"};
  font-size: 3rem;
  text-transform: uppercase;
  text-align: center;
`;

interface IHello {
  color: string;
}

const Hello: React.FC<IHello> = (props) => {
    return <HelloStyled color={props.color}>{props.children}</HelloStyled>
};

export default Hello;