import { AudioItem } from "./types";

interface AudioBlock {
  id: string;
  questionIds: number[];
}

// Set start numbers within each page — used to lay out question groups
// (dotted dividers, graphics) even though each page now plays as one track.
export const PART3_SET_STARTS = [32, 35, 38, 41, 44, 47, 50, 53, 56, 59, 62, 65, 68];
export const PART4_SET_STARTS = [71, 74, 77, 80, 83, 86, 89, 92, 95, 98];

function range(start: number, end: number): number[] {
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

// One audio file per page (directions pages get their own separate item) —
// 15 files total, all under /toeic/test1/audio/. No per-question or
// per-set audio anymore; playback advances one page-track at a time.
const AUDIO_SEQUENCE: AudioBlock[] = [
  { id: "directions", questionIds: [] }, // P1 — intro + Part 1 directions
  { id: "p02", questionIds: [1, 2] },
  { id: "p03", questionIds: [3, 4] },
  { id: "p04", questionIds: [5, 6] },
  { id: "p05-directions", questionIds: [] }, // Part 2 directions
  { id: "p05", questionIds: range(7, 31) },
  { id: "p06-directions", questionIds: [] }, // Part 3 directions
  { id: "p06", questionIds: range(32, 43) },
  { id: "p07", questionIds: range(44, 55) },
  { id: "p08", questionIds: range(56, 64) },
  { id: "p09", questionIds: range(65, 70) },
  { id: "p10-directions", questionIds: [] }, // Part 4 directions
  { id: "p10", questionIds: range(71, 82) },
  { id: "p11", questionIds: range(83, 94) },
  { id: "p12", questionIds: range(95, 100) },
];

function audioSrcFor(id: string): string {
  return `/toeic/test1/audio/${id}.mp3`;
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
