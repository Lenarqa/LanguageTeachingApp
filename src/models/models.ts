interface IWord {
  id: number;
  position: number;
  content: string;
}

interface IPhrase {
  [key: string]: IWord[];
}

export default IPhrase;
