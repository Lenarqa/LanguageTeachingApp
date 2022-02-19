import React, { useEffect, useState } from "react";
import { IInitData } from "../models/models";

const SENTENCE_QUERY = `
{
    sentenceAll {
      en,
      ru
    }
}
`;

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

  useEffect(() => {
    console.log("Hello from context");
    fetch("https://academtest.ilink.dev/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: SENTENCE_QUERY }),
    })
      .then((response) => response.json())
      .then((data) => {
        const sentenceAll = data.data.sentenceAll;
        const sentences: string[] = [];
        let wordsEn: string[] = [];

        for (let i = 0; i < sentenceAll.length; i++) {
          sentences.push(sentenceAll[i].ru);
          wordsEn[i] = sentenceAll[i].en.split(" ");
        }

        
      });
  }, []);

  const contextValue = {
    data: wordsData,
    setData: setWordsData,
  };

  return (
    <WordsContext.Provider value={contextValue}>
      {props.children}
    </WordsContext.Provider>
  );
};

export default WordsContextProvider;
