// Parses "Complete the Words" paragraphs like "abs___ (2)" into typed text
// segments and blanks, mirroring the original reading-webapp/app.js parser.

export type FillSegment =
  | { type: "text"; text: string }
  | { type: "blank"; number: number; prefix: string; missingLen: number };

export type BlankMeta = { number: number; prefix: string; missingLen: number };

export function parseFillParagraph(
  paragraph: string,
  correctAnswers: string[]
): FillSegment[] {
  const re = /([A-Za-z’']+?)_{3,}\s*\((\d+)\)/g;
  const segments: FillSegment[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = re.exec(paragraph)) !== null) {
    const prefix = match[1];
    const num = parseInt(match[2], 10);

    if (match.index > lastIndex) {
      segments.push({ type: "text", text: paragraph.slice(lastIndex, match.index) });
    }
    lastIndex = match.index + match[0].length;

    const correctWord = correctAnswers[num - 1] || "";
    const missingLen = Math.max(0, correctWord.length - prefix.length);
    segments.push({ type: "blank", number: num, prefix, missingLen });
  }

  if (lastIndex < paragraph.length) {
    segments.push({ type: "text", text: paragraph.slice(lastIndex) });
  }

  return segments;
}

export function getBlankMeta(paragraph: string, correctAnswers: string[]): BlankMeta[] {
  return parseFillParagraph(paragraph, correctAnswers).filter(
    (s): s is Extract<FillSegment, { type: "blank" }> => s.type === "blank"
  );
}
