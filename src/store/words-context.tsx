import React, { useEffect, useState } from "react";
import { IInitData } from "../models/models";

type contextObject = {
  data: IInitData;
  setData(newData: IInitData): void;
};

export const WordsContext = React.createContext<contextObject>({
  data: {
    words: {},
    rows: {},
    rowsOrder: [],
  },
  setData: (newData: IInitData) => {},
});

const WordsContextProvider: React.FC = (props) => {
  const [wordsData, setWordsData] = useState<IInitData>({
    words: {},
    rows: {},
    rowsOrder: [],
  });

  useEffect(()=>{
    console.log("Hello")
  }, [])

  const contextValue = {
    data: wordsData,
    setData: setWordsData,
  };

  return <WordsContext.Provider value={contextValue}>{props.children}</WordsContext.Provider>;
};

export default WordsContextProvider;
