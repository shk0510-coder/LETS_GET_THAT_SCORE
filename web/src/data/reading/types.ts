export type MCQQuestion = {
  number: number;
  question: string;
  choices: string[];
  answerIndex: number;
  explanation: string;
};

export type DailyLifeItem = {
  label: string;
  text: string;
  questions: MCQQuestion[];
};

export type ReadingModule = {
  title: string;
  completeWords: {
    paragraph: string;
    answers: string[];
    explanations: string[];
  };
  dailyLife: {
    notice: DailyLifeItem;
    post: DailyLifeItem;
    message: DailyLifeItem;
  };
  academicPassage: {
    title: string;
    passage: string;
    questions: MCQQuestion[];
  };
};

export type ReadingTest = {
  testId: string;
  title: string;
  modules: ReadingModule[];
};
