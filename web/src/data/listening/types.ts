export type SetQuestion = {
  number: number;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

export type ResponseItem = {
  kind: "response";
  number: number;
  instruction: string;
  displayMode: string;
  visual: string;
  audio: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

export type SetItem = {
  kind: "set";
  setType: string;
  numberStart: number;
  numberEnd: number;
  instruction: string;
  visual: string;
  audio: string;
  questions: SetQuestion[];
};

export type ListeningItem = ResponseItem | SetItem;

export type ListeningModule = {
  title: string;
  difficulty: string;
  items: ListeningItem[];
};

export type ListeningTest = {
  testId: string;
  title: string;
  audioNote: string;
  modules: ListeningModule[];
};
