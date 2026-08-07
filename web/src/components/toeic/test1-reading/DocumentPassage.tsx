import { ReadingPassage } from "@/data/toeic/test1/reading";
import { TYPE_LABELS } from "./passageTypeLabels";

// Shared frame for article / letter / memo / notice / schedule / review /
// form / invoice — a plain document look with a ruled masthead label.
export function DocumentPassage({ passage }: { passage: ReadingPassage }) {
  return (
    <div className="border border-black/15 p-4">
      <p className="text-[11px] font-bold uppercase tracking-widest text-[#444] pb-2 mb-3 border-b border-black/20">
        {TYPE_LABELS[passage.type] ?? passage.type}
      </p>
      <div className="text-[13px] leading-relaxed whitespace-pre-line">{passage.content}</div>
    </div>
  );
}
