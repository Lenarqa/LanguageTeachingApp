import React from "react";
import styled from "styled-components";

interface IWordItem {
  word: string;
}

const WordItem: React.FC<IWordItem> = (props) => {
  return <p>{props.word}</p>;
};

export default WordItem;
