import { ReadingQuestionSet } from "@/data/toeic/test1/reading";
import { TYPE_LABELS } from "./passageTypeLabels";

function joinWithAnd(items: string[]): string {
  if (items.length <= 1) return items[0] ?? "";
  if (items.length === 2) return `${items[0]} and ${items[1]}`;
  return `${items.slice(0, -1).join(", ")}, and ${items[items.length - 1]}`;
}

/**
 * "Questions 147-148 refer to the following e-mail." — built purely from
 * the set's question range and each passage's `type`, so it works
 * unchanged for future tests instead of being hand-written per set.
 */
export function setReferenceLabel(set: ReadingQuestionSet): string {
  const start = set.questionIds[0];
  const end = set.questionIds[set.questionIds.length - 1];
  const types = set.passages.map((p) => (TYPE_LABELS[p.type] ?? p.type).toLowerCase());
  return `Questions ${start}-${end} refer to the following ${joinWithAnd(types)}.`;
}
