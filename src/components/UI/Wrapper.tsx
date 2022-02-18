import React from "react";
import styled from "styled-components";

const WrapperStyle = styled.div`
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 100%;
`;

const Wrapper: React.FC = (props) => {
  return <WrapperStyle>{props.children}</WrapperStyle>;
};

export default Wrapper;
