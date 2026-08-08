export interface CompleteWordsBlank {
  no: number; // 1-10, matches the passage's {n} marker
  answer: string; // full correct word, lowercase
  revealed: string; // given prefix (prefix of `answer`)
  pos: string; // part of speech tag, Korean
  meaning: string; // Korean meaning
  note: string; // short one-line grammatical/positional note, Korean
}

export interface CompleteWordsPassage {
  practiceNumber: number; // 1-5
  title: string;
  topic: string;
  passage: string; // contains {1}..{10} placeholder markers
  translation: string; // full Korean translation
  blanks: CompleteWordsBlank[]; // exactly 10, ordered by `no`
}
