import { ReadingPassage } from "@/data/toeic/test1/reading";

// Ad passages open with an ALL-CAPS headline run directly into normal-case
// body prose (no delimiter in the source). Capture the leading caps run up
// to the first Title-Case word as the headline.
function splitHeadline(content: string): { headline: string | null; body: string } {
  const match = content.match(/^([A-Z0-9][A-Z0-9\s\-,'.!&]*?)\s+(?=[A-Z][a-z])/);
  if (!match) return { headline: null, body: content };
  return { headline: match[1].trim(), body: content.slice(match[0].length).trim() };
}

export function AdvertisementPassage({ passage }: { passage: ReadingPassage }) {
  const { headline, body } = splitHeadline(passage.content);

  return (
    <div className="border border-black/15 p-4">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#666] mb-2">Advertisement</p>
      {headline && <p className="text-[16px] font-extrabold leading-snug mb-2">{headline}</p>}
      <div className="text-[13px] leading-relaxed whitespace-pre-line">{body}</div>
    </div>
  );
}
