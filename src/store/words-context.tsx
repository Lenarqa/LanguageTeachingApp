import React, { useEffect, useState, useCallback } from "react";

const SENTENCE_QUERY = `
{
    sentenceAll {
      en,
      ru
    }
}
`;

type contextObject = {
  isLoading: boolean;
  changeWord: () => void;
};

export const WordsContext = React.createContext<contextObject>({
  isLoading: true,
  changeWord: () => {},
});

const WordsContextProvider: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);

  

  useEffect(() => {
    setIsLoading(true);
    fetch("https://academtest.ilink.dev/graphql", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query: SENTENCE_QUERY }),
    })
      .then((response) => response.json())
      .then((data) => {
        const sentenceAll = data.data.sentenceAll;
        const ruSentences: string[] = [];
        const enSentences: string[] = [];
        let wordsEn: string[] = [];

        for (let i = 0; i < sentenceAll.length; i++) {
          ruSentences[i] = sentenceAll[i].ru;
          enSentences[i] = sentenceAll[i].en;
          wordsEn[i] = sentenceAll[i].en.split(" ");
        }

        setIsLoading(false);
      });
  }, []);

  const changeWordHandler = () => {
    console.log("change word handler");
    // let randomWordIndex: number = Math.floor(Math.random() * wordsData.length);
    // setCurWordData(wordsData[randomWordIndex]);
    // return wordsData[randomWordIndex];
  };

  const setCurWordDataHandler = () => {
    console.log("setCurWordDataHandler");
    
    // let randomWordIndex: number = Math.floor(Math.random() * wordsData.length);
    // setCurWordData(wordsData[randomWordIndex]);
    // return wordsData[randomWordIndex];
  };

  const contextValue = {
    isLoading: isLoading,
    changeWord: changeWordHandler
  };

  return (
    <WordsContext.Provider value={contextValue}>
      {props.children}
    </WordsContext.Provider>
  );
};

export default WordsContextProvider;
