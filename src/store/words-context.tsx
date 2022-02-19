import React, { useEffect, useState } from "react";
import { IInitData, IWordNew } from "../models/models";

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
  const [wordsData, setWordsData] = useState<IInitData[]>([]);
  const [curWordsData, setCurWordsData] = useState<IInitData>({
    words: {},
    rows: {},
    rowsOrder: [],
  });

  const createStructure = (sentences: string[], wordEn: string[]) => {
    //   create words
    let words: { [key: string] : IWordNew[]; } = {};
    for (let i = 0; i < wordEn.length; i++) {
        const newWord:IWordNew[] = [];
        for (let j = 0; j < wordEn[i].length; j++) {
            newWord.push({id: `word-${j}`, content:wordEn[i][j]});
        }
        words[`word-${i}`] = {...newWord};
    }

    console.log(words);
    
  };

  useEffect(() => {
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
        createStructure(sentences, wordsEn);
      });
  }, [createStructure]);

  const contextValue = {
    data: curWordsData,
    setData: setCurWordsData,
  };

  return (
    <WordsContext.Provider value={contextValue}>
      {props.children}
    </WordsContext.Provider>
  );
};

export default WordsContextProvider;
