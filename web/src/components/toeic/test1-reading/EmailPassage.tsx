import { ReadingPassage } from "@/data/toeic/test1/reading";

/**
 * The source passages are plain prose ("Dear X, ... Best regards, Y"), not
 * labeled To:/From: fields. Both are extracted from text that's already
 * there (greeting / sign-off) rather than invented — if a passage doesn't
 * match either pattern, that row is simply omitted.
 */
// Requires a literal trailing comma so e.g. "Thank you for applying" (no
// comma) doesn't false-match as a sign-off, and takes the rightmost hit so
// the real sign-off wins even if a trigger word appears earlier too.
const SIGNOFF_PHRASES = ["Sincerely,", "Best regards,", "Regards,", "Thank you,"];

function parseEmail(content: string): { to?: string; from?: string; body: string } {
  let body = content;
  let to: string | undefined;
  let from: string | undefined;

  const toMatch = body.match(/^Dear\s+([^,]+),\s*/);
  if (toMatch) {
    to = toMatch[1].trim();
    body = body.slice(toMatch[0].length);
  }

  let signoffIndex = -1;
  let signoffLength = 0;
  for (const phrase of SIGNOFF_PHRASES) {
    const idx = body.lastIndexOf(phrase);
    if (idx > signoffIndex) {
      signoffIndex = idx;
      signoffLength = phrase.length;
    }
  }
  if (signoffIndex !== -1) {
    from = body.slice(signoffIndex + signoffLength).trim().replace(/\.$/, "");
    body = body.slice(0, signoffIndex).trim();
  }

  return { to, from, body: body.trim() };
}

export function EmailPassage({ passage }: { passage: ReadingPassage }) {
  const { to, from, body } = parseEmail(passage.content);

  return (
    <div className="border border-black/15">
      {to || from ? (
        <div className="px-4 py-2 bg-black/[0.03] border-b border-black/15 text-[12px] flex flex-col gap-0.5">
          {to && (
            <div className="flex gap-2">
              <span className="font-semibold w-12 shrink-0 text-[#666]">To</span>
              <span>{to}</span>
            </div>
          )}
          {from && (
            <div className="flex gap-2">
              <span className="font-semibold w-12 shrink-0 text-[#666]">From</span>
              <span>{from}</span>
            </div>
          )}
        </div>
      ) : (
        <p className="px-4 py-2 bg-black/[0.03] border-b border-black/15 text-[10px] font-bold uppercase tracking-wide text-[#666]">
          E-mail
        </p>
      )}
      <div className="p-4 text-[13px] leading-relaxed whitespace-pre-line">{body}</div>
    </div>
  );
}
