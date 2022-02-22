import React, { useEffect, useState, useCallback } from "react";
import { IInitData, IRowNew, IWordNew } from "../models/models";

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
  changeWord: () => IInitData;
  curWordData: IInitData;
  setCurWordData: (item: IInitData) => void
};

const initObj = {words: {}, rows: {}, rowsOrder:[], ru:"init", en: "init en"};

export const WordsContext = React.createContext<contextObject>({
  isLoading: true,
  changeWord: () => initObj,
  curWordData: initObj,
  setCurWordData: (prevState: IInitData) => {},
});

const WordsContextProvider: React.FC = (props) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [wordsData, setWordsData] = useState<IInitData[]>([]);
  const [curWordData, setCurWordData] = useState<IInitData>(initObj);

  const createStructure = useCallback(
    (enSentences: string[], sentences: string[], wordEn: string[]) => {
      let words = [];
      for (let i = 0; i < wordEn.length; i++) {
        let newWord: { [key: string]: IWordNew } = {};
        for (let j = 0; j < wordEn[i].length; j++) {
          newWord[`word-${j}`] = { id: `word-${j}`, content: wordEn[i][j] };
        }
        words.push(newWord);
      }

      //create rows
      const rowCount: number[] = [];
      for (let i = 0; i < wordEn.length; i++) {
        //в каждой строке будет по 4 слова
        //округляем в большую сторону и умножаем на 2
        //(строки куда вставлять слова и строки с начальным набором слов)
        rowCount[i] = Math.ceil(wordEn[i].length / 4) * 2;
      }

      let wordIds = [];
      for (let i = 0; i < words.length; i++) {
        wordIds[i] = Object.keys(words[i]);
      }

      //делим этот массив на подмассивы по 4 шт, в каждой строке будут свои 4 слова
      let size = 4; //размер подмассива
      let subWordIds = [];
      for (let i = 0; i < wordIds.length; i++) {
        let subarray = [];
        for (let j = 0; j < Math.ceil(wordIds[i].length / size); j++) {
          subarray[j] = wordIds[i].slice(j * size, j * size + size);
        }
        subWordIds.push(subarray);
      }

      let rows: {
        [key: string]: {
          [key: string]: IRowNew;
        };
      } = {};
      let curWordIndex: number = 0;
      for (let i = 0; i < rowCount.length; i++) {
        let curSubIndex: number = 0;
        //   получаем массив ключей к слову
        let newRow: { [key: string]: IRowNew } = {};
        for (let j = 0; j < rowCount[i]; j++) {
          if (j < rowCount[i] / 2) {
            newRow[`row-${j}`] = {
              id: `row-${j}`,
              isPhrase: true,
              wordIds: [],
            };
          } else {
            newRow[`row-${j}`] = {
              id: `row-${j}`,
              isPhrase: false,
              wordIds: subWordIds[curWordIndex][curSubIndex],
            };
            curSubIndex++;
          }
        }
        curWordIndex++;

        rows[`row-${i}`] = newRow;
      }

      //create rowsOrder
      let rowsOrder = [];
      let rowsKeys = Object.keys(rows);
      for (let i = 0; i < rowsKeys.length; i++) {
        rowsOrder[i] = Object.keys(rows[rowsKeys[i]]);
      }

      let initData: IInitData[] = [];
      for (let i = 0; i < wordEn.length; i++) {
        let initDataItem: IInitData = {
          words: words[i],
          rows: rows[`row-${i}`],
          rowsOrder: rowsOrder[i],
          ru: sentences[i],
          en: enSentences[i],
        };
        initData.push(initDataItem);
      }

      return initData;
    },
    []
  );

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

        let initData = createStructure(enSentences, ruSentences, wordsEn);
        setWordsData(initData);
        let randomWordIndex:number = Math.floor(Math.random() * initData.length);

        setCurWordData(initData[randomWordIndex]);

        setIsLoading(false);
      });
  }, [createStructure]);

  const changeWordHandler = () => {
    console.log("change word handler");
    let randomWordIndex:number = Math.floor(Math.random() * wordsData.length);
    setCurWordData(wordsData[randomWordIndex]);
    return wordsData[randomWordIndex];
  };


  const setCurWordDataHandler = () => {
    let randomWordIndex:number = Math.floor(Math.random() * wordsData.length);
    setCurWordData(wordsData[randomWordIndex]);
    return wordsData[randomWordIndex];
  }

  const contextValue = {
    isLoading: isLoading,
    changeWord: changeWordHandler,
    curWordData: curWordData,
    setCurWordData: setCurWordData,
  };

  return (
    <WordsContext.Provider value={contextValue}>
      {props.children}
    </WordsContext.Provider>
  );
};

export default WordsContextProvider;

