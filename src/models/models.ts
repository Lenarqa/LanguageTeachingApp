export interface IWord {
  id: number;
  word: string;
}

export interface IWordNew {
  id: string;
  content: string;
}

export interface IRowNew {
  id: string;
  wordIds: string[];
}

export interface IInitData {
  words: { [key in string]: IWordNew };
  rows: { [key in string]: IRowNew };
  rowsOrder: string[];
}
