import React, {useContext} from "react";
import { IWord } from "../../models/models";
import WordItem from "./WordItem";
import { WordsContext } from "../../store/words-context";
import { GridDropZone } from "react-grid-dnd";

interface DndGroupWordsProps {
  id: string;
  newWords: IWord[];
}

interface DndGroupWordsStyledProps {
  id: string;
}

const DndGroupWords: React.FC<DndGroupWordsProps> = (props) => {
  const wordsCtx = useContext(WordsContext)
  let style = {};
  let rowHeight = Math.ceil((wordsCtx.curPhrase.phrase.words.length / 5)) * 45;
  console.log(rowHeight);
  
  if(props.id === "phrase") {
    style = {
      width: "100%",
      height: `${rowHeight}px`,
      backgroundImage:
        "linear-gradient(rgba(75, 75, 75, 1),rgba(75, 75, 75, 1) 5%, transparent 5%, transparent)",
      backgroundSize: "100% 40px",
    }
  }else {
    style = {
      width: "100%",
      height: `${rowHeight}px`,
      marginBottom: "79px",
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
