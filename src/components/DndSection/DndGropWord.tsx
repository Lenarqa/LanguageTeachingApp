import React, {useContext} from "react";
import { IWord } from "../../models/models";
import WordItem from "./WordItem";
import { WordsContext } from "../../store/words-context";
import { GridDropZone } from "react-grid-dnd";

interface DndGroupWordsProps {
  id: string;
  newWords: IWord[];
}

const DndGroupWords: React.FC<DndGroupWordsProps> = (props) => {
  const wordsCtx = useContext(WordsContext)
  let maxLength = 0;
  let style = {};

  // if(wordsCtx.curPhrase.phrase.words.length > wordsCtx.curPhrase.phrase.phrase.length) {
  //   maxLength = wordsCtx.curPhrase.phrase.words.length;
  // }else {
  //   maxLength = wordsCtx.curPhrase.phrase.phrase.length;
  // }
  // let rowHeight = Math.ceil(( maxLength/ 5)) * 45;
  
  if(props.id === "phrase") {
    style = {
      width: "100%",
      height: `90px`,
      backgroundImage:
        "linear-gradient(rgba(75, 75, 75, 1),rgba(75, 75, 75, 1) 5%, transparent 5%, transparent)",
      backgroundSize: "100% 40px",
    }
  }else {
    style = {
      width: "100%",
      height: `90px`,
      marginBottom: "20px",
    }
  }
  

  return (
    <GridDropZone style={style} id={props.id} boxesPerRow={5} rowHeight={42}>
      {props.newWords.map((word) => (
        <WordItem key={word.id} id={word.id} content={word.content} />
      ))}
    </GridDropZone>
  );
};

export default DndGroupWords;
