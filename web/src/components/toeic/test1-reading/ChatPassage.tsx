import { ReadingPassage } from "@/data/toeic/test1/reading";
import { TYPE_LABELS } from "./passageTypeLabels";

function detectSender(content: string): string | undefined {
  const m = content.match(/this is ([A-Z][a-zA-Z]+)/);
  return m?.[1];
}

// Only single-message content exists in the current data set, so this
// renders one bubble. Extending to alternating turns would need a real
// multi-speaker example to design against.
export function ChatPassage({ passage }: { passage: ReadingPassage }) {
  const sender = detectSender(passage.content);

  return (
    <div className="border border-black/15 p-4 bg-[#f7f7f5]">
      <p className="text-[10px] font-bold uppercase tracking-wide text-[#666] mb-3">
        {TYPE_LABELS[passage.type] ?? passage.type}
      </p>
      <div className="flex flex-col items-start gap-1 max-w-[85%]">
        {sender && <span className="text-[11px] font-semibold text-[#666] px-1">{sender}</span>}
        <div className="bg-white border border-black/10 rounded-2xl rounded-tl-sm px-3 py-2 text-[13px] leading-relaxed">
          {passage.content}
        </div>
      </div>
    </div>
  );
}
