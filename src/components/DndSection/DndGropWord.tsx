import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { IWord } from "../../models/models";
import WordItem from "./WordItem";
import { GridDropZone } from "react-grid-dnd";

const DndGroupWordsWrapper = styled.div`
  position: relative;
  z-index: 0;
`;

// const GridTestWrapper = styled.div`
//   background-color: lightblue;
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 465px;
//   height: 90px;
//   display: grid;
//   grid-template-columns: repeat(5, 1fr);
//   /* z-index: -1000; */
// `;

// const WordItemWrapper = styled.div`
//   /* background: #e6e6e6; */
//   background-color: red;
//   z-index: -1;
//   border-radius: 13px;
//   padding: 4px 18px 5px 18px;
//   margin: 4px 10px 4px 0px;
//   width: 78px;
//   height: 26px;
//   /* box-shadow: inset 0px 8px 4px -6px rgba(0, 0, 0, 0.25); */
// `;

interface DndGroupWordsProps {
  id: string;
  newWords: IWord[];
}

const DndGroupWords: React.FC<DndGroupWordsProps> = (props) => {
  // const [bgItems, setBgItems] = useState<IWord[]>([] as IWord[])
  // useEffect(()=>{
  //   // глубокое копирование.
  //   setBgItems(JSON.parse(JSON.stringify(props.newWords)));
  // }, []);

  let style = {};

  if (props.id === "phrase") {
    style = {
      width: "100%",
      height: `90px`,
      backgroundImage:
        "linear-gradient(rgba(75, 75, 75, 1),rgba(75, 75, 75, 1) 5%, transparent 5%, transparent)",
      backgroundSize: "100% 40px",
    };
  } else {
    style = {
      width: "100%",
      height: `90px`,
      marginBottom: "20px",
    };
  }

  return (
    <DndGroupWordsWrapper>
      <GridDropZone style={style} id={props.id} boxesPerRow={5} rowHeight={42}>
        {props.newWords.map((word) => (
          <WordItem key={word.id} id={word.id} content={word.content} />
        ))}
      </GridDropZone>
      {/* {props.id === "words" && (
        <GridTestWrapper>
          {bgItems.map((item, index) => (
            <WordItemWrapper key={index} />
          ))}
        </GridTestWrapper>
      )} */}
    </DndGroupWordsWrapper>
  );
};

export default DndGroupWords;
