import React from "react";
import styled from "styled-components";

const UserStyled = styled.span`
  width: 40%;
  margin: 0 1rem;
  padding-bottom: 3.2rem;
  display: inline-block;
  position: relative;
  width: 4rem;
  height: 4rem;
  background: #6c6c6c;
  border-radius: 50%;

  &::before {
    content: "";
    top: 90%;
    left: 50%;
    transform: translateX(-50%);
    position: absolute;
    width: 6rem;
    height: 3rem;
    border-radius: 50% 50% 7% 7% / 100% 100% 14% 14%;
    background: #6c6c6c;
  }
`;
const User: React.FC = (props) => {
  return <UserStyled />;
};

export default User;
