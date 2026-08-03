export type SectionId = "reading" | "listening" | "writing" | "speaking";

export const TOEFL_SECTIONS: { id: SectionId; label: string }[] = [
  { id: "reading", label: "Reading" },
  { id: "listening", label: "Listening" },
  { id: "writing", label: "Writing" },
  { id: "speaking", label: "Speaking" },
];

// Reading/Listening are backed by the integrated practice webapps (5 tests
// each). Writing/Speaking use the placeholder video player and share the
// same test count for a consistent grid.
export const TOEFL_TEST_COUNT: Record<SectionId, number> = {
  reading: 5,
  listening: 5,
  writing: 5,
  speaking: 5,
};

// Section id -> the [testId] slug pattern each integration expects.
export function toeflTestIdFor(section: SectionId, index: number) {
  if (section === "listening") return `listening_test${index}`;
  return `test${index}`;
}

export const TOEFL_PRACTICE_TYPES: Record<
  SectionId,
  { label: string; count: number }[]
> = {
  reading: [
    { label: "Fill in the Blank", count: 15 },
    { label: "Read in Daily Life", count: 12 },
    { label: "Read an Academic Passage", count: 10 },
  ],
  listening: [
    { label: "Listen and Choose a Response", count: 12 },
    { label: "Listen to a Conversation", count: 10 },
    { label: "Listen to an Announcement", count: 8 },
    { label: "Listen to an Academic Talk", count: 10 },
  ],
  writing: [
    { label: "Build a Sentence", count: 15 },
    { label: "Write an Email", count: 10 },
    { label: "Academic Discussion", count: 8 },
  ],
  speaking: [
    { label: "Listen and Repeat", count: 12 },
    { label: "Take an Interview", count: 10 },
  ],
};

export type ToeicSectionId = "listening" | "reading";

export const TOEIC_SECTIONS: { id: ToeicSectionId; label: string }[] = [
  { id: "listening", label: "Listening" },
  { id: "reading", label: "Reading" },
];

export const TOEIC_TEST_COUNT: Record<ToeicSectionId, number> = {
  listening: 5,
  reading: 5,
};

export const TOEIC_PRACTICE_TYPES: Record<
  ToeicSectionId,
  { label: string; count: number }[]
> = {
  listening: [
    { label: "Part 1 — Photographs", count: 6 },
    { label: "Part 2 — Question-Response", count: 10 },
    { label: "Part 3 — Conversations", count: 8 },
    { label: "Part 4 — Talks", count: 8 },
  ],
  reading: [
    { label: "Part 5 — Incomplete Sentences", count: 12 },
    { label: "Part 6 — Text Completion", count: 8 },
    { label: "Part 7 — Reading Comprehension", count: 10 },
  ],
};
