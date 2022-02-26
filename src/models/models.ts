export interface IWord {
  id: number;
  position: number;
  content: string;
}

export interface IPhrase {
  [key: string]: IWord[];
}

export interface IPhraseData {
  ru: string;
  en: string;
  phrase:IPhrase;
}
