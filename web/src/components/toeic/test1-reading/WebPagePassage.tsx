import { ReadingPassage } from "@/data/toeic/test1/reading";

function extractUrl(content: string): string | undefined {
  const m = content.match(/\b(?:https?:\/\/|www\.)[^\s)]+/i);
  return m?.[0];
}

export function WebPagePassage({ passage }: { passage: ReadingPassage }) {
  const url = extractUrl(passage.content);

  return (
    <div className="border border-black/15">
      <div className="flex items-center gap-2 px-3 py-1.5 bg-[#e8e8e6] border-b border-black/15">
        <span className="text-[12px] text-[#999] select-none">◀</span>
        <span className="text-[12px] text-[#999] select-none">▶</span>
        <span className="flex-1 bg-white border border-black/10 rounded px-2 py-0.5 text-[11px] text-[#555] truncate">
          {url ?? ""}
        </span>
      </div>
      <div className="p-4 text-[13px] leading-relaxed whitespace-pre-line">{passage.content}</div>
    </div>
  );
}
