import React, { useEffect, useState, useCallback } from "react";
import { IPhraseData, IWord } from "../models/models";

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
  curPhrase: IPhraseData;
  setCurPhrase: React.Dispatch<React.SetStateAction<IPhraseData>>;
  changeWord: () => void;
};

export const WordsContext = React.createContext<contextObject>({
  isLoading: true,
  curPhrase: {} as IPhraseData,
  setCurPhrase: () => {},
  changeWord: () => {},
});

const WordsContextProvider: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [phraseData, setPhraseData] = useState<IPhraseData[]>([]);
  const [curPhrase, setCurPhrase] = useState<IPhraseData>({} as IPhraseData);

  const createStructure = useCallback((sentenceAll: any) => {
    const ruSentences: string[] = [];
    const enSentences: string[] = [];
    let wordsEn: string[] = [];

    //create ru and en sentences arrays
    for (let i = 0; i < sentenceAll.length; i++) {
      ruSentences[i] = sentenceAll[i].ru;
      enSentences[i] = sentenceAll[i].en;
      wordsEn[i] = sentenceAll[i].en.split(" ");
    }

    //create en words arrays as IWord
    let wordsData = [];
    for (let i = 0; i < wordsEn.length; i++) {
      let tempWordData: IWord[] = [];
      for (let j = 0; j < wordsEn[i].length; j++) {
        tempWordData[j] = { id: j, position: 0, content: wordsEn[i][j] };
      }
      wordsData.push(tempWordData);
    }

    // sorting words
    for (let i = 0; i < wordsData.length; i++) {
      wordsData[i] = wordsData[i].sort(() => Math.random() - 0.5);
    }
    
    // remember the position
    for (let i = 0; i < wordsData.length; i++) {
      wordsData[i] = wordsData[i].map((item, index) => {
        item.position = index;
        return item;
      });
    }

    let structuredData = [];
    for (let i = 0; i < sentenceAll.length; i++) {
      structuredData.push({
        ru: ruSentences[i],
        en: enSentences[i],
        phrase: {
          phrase: [],
          words: wordsData[i],
        },
      });
    }
    return structuredData;
  }, []);

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
        const structuredData = createStructure(sentenceAll);

        setPhraseData(structuredData);

        const randomWordIndex: number = Math.floor(
          Math.random() * structuredData.length
        );
        setCurPhrase(structuredData[randomWordIndex]);

        setIsLoading(false);
      });
  }, [createStructure]);

  const changeWordHandler = () => {
    let randomWordIndex: number = Math.floor(Math.random() * phraseData.length);
    setCurPhrase(phraseData[randomWordIndex]);
  };

  const contextValue = {
    isLoading: isLoading,
    curPhrase: curPhrase,
    setCurPhrase: setCurPhrase,
    changeWord: changeWordHandler,
  };

  return (
    <WordsContext.Provider value={contextValue}>
      {props.children}
    </WordsContext.Provider>
  );
};

export default WordsContextProvider;
