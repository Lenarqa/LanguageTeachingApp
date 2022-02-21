export interface IWordNew {
  id: string;
  content: string;
}

export interface IRowNew {
  id: string;
  isPhrase: boolean;
  wordIds: string[];
}

export interface IInitData {
  words: { [key in string]: IWordNew };
  rows: { [key in string]: IRowNew };
  rowsOrder: string[];
  ru: string;
  en:string;
}
