import React from "react";
import ReactDOM from "react-dom";
import styled, { createGlobalStyle } from "styled-components";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const Global = createGlobalStyle`
  position: relative;
    
  * {
    font-family: 'Roboto';
      padding:0;
      margin:0;
      box-sizing:border-box;
      
  }
`;

ReactDOM.render(
  <>
    <Global />
    <App />
  </>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
