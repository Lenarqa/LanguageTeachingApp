import React from "react";
import ReactDOM from "react-dom";
import { createGlobalStyle } from "styled-components";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import WordsContextProvider from "./store/words-context";

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
  <WordsContextProvider>
    <Global />
    <App />
  </WordsContextProvider>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
