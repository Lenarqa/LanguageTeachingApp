import React from "react";
import styled from "styled-components";

const WrapperStyle = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    height: 70vh;
    width: 25vw;
    border: 1px solid black;
    top: 50%;
    left: 50%;
    transform: translateX(-50%) translateY(-50%);

`

const Wrapper: React.FC = (props) => {
    return <WrapperStyle>
        {props.children}
    </WrapperStyle>
}

export default Wrapper;