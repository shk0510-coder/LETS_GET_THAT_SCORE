// Parses a passage containing "{1}", "{2}", ... placeholder markers into
// typed text/blank segments. Blank metadata (revealed prefix, full answer)
// lives separately on each CompleteWordsBlank — the passage string itself
// carries no letters, just numbered slots.

export type CompleteWordsSegment = { type: "text"; text: string } | { type: "blank"; no: number };

export function parseCompleteWordsPassage(passage: string): CompleteWordsSegment[] {
  const re = /\{(\d+)\}/g;
  const segments: CompleteWordsSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(passage)) !== null) {
    if (match.index > lastIndex) {
      segments.push({ type: "text", text: passage.slice(lastIndex, match.index) });
    }
    segments.push({ type: "blank", no: Number(match[1]) });
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < passage.length) {
    segments.push({ type: "text", text: passage.slice(lastIndex) });
  }

  return segments;
}
