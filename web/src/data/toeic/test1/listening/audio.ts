import { AudioItem } from "./types";

interface AudioBlock {
  id: string;
  questionIds: number[];
}

export const PART3_SET_STARTS = [32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68];
export const PART4_SET_STARTS = [71, 74, 77, 80, 83, 86, 89, 92, 95, 98];

function part1QuestionBlocks(): AudioBlock[] {
  return Array.from({ length: 6 }, (_, i) => {
    const q = i + 1;
    return { id: `p1-q${String(q).padStart(3, "0")}`, questionIds: [q] };
  });
}

function part2QuestionBlocks(): AudioBlock[] {
  return Array.from({ length: 25 }, (_, i) => {
    const q = i + 7;
    return { id: `p2-q${String(q).padStart(3, "0")}`, questionIds: [q] };
  });
}

function setBlocks(part: 3 | 4, starts: number[]): AudioBlock[] {
  return starts.map((start) => ({
    id: `p${part}-set${String(start).padStart(3, "0")}`,
    questionIds: [start, start + 1, start + 2],
  }));
}

// Part 2/3/4 directions audio is bundled into the first item's file
// (Q7 / each part's first set) — no standalone directions block for those parts.
const AUDIO_SEQUENCE: AudioBlock[] = [
  { id: "p1-directions", questionIds: [] },
  ...part1QuestionBlocks(),
  ...part2QuestionBlocks(),
  ...setBlocks(3, PART3_SET_STARTS),
  ...setBlocks(4, PART4_SET_STARTS),
];

function audioSrcFor(id: string): string {
  if (id === "p1-directions") return "/toeic/test1/audio/part1/directions.mp3";
  const [partSegment, rest] = id.split("-");
  const part = partSegment.replace("p", "");
  return `/toeic/test1/audio/part${part}/${rest}.mp3`;
}

export const AUDIO_ITEMS: AudioItem[] = AUDIO_SEQUENCE.map((block, i) => ({
  id: block.id,
  src: audioSrcFor(block.id),
  order: i + 1,
  questionIds: block.questionIds,
}));

export const TOTAL_AUDIO_COUNT = AUDIO_ITEMS.length;

export function getAudioItem(id: string): AudioItem | undefined {
  return AUDIO_ITEMS.find((a) => a.id === id);
}

export function getAudioItemByOrder(order: number): AudioItem | undefined {
  return AUDIO_ITEMS.find((a) => a.order === order);
}

export function getAudioItemForQuestion(questionId: number): AudioItem | undefined {
  return AUDIO_ITEMS.find((a) => a.questionIds.includes(questionId));
}
