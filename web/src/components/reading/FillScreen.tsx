import { useMemo, useRef } from "react";
import { ReadingModule } from "@/data/reading/types";
import { parseFillParagraph } from "./fillParser";

export function FillScreen({
  module: mod,
  answers,
  onChangeBlank,
}: {
  module: ReadingModule;
  answers: string[];
  onChangeBlank: (blankIndex: number, value: string) => void;
}) {
  const segments = useMemo(
    () => parseFillParagraph(mod.completeWords.paragraph, mod.completeWords.answers),
    [mod]
  );
  const inputRefs = useRef(new Map<string, HTMLInputElement>());

  function keyFor(num: number, pos: number) {
    return `${num}-${pos}`;
  }

  function focusBox(num: number, pos: number) {
    inputRefs.current.get(keyFor(num, pos))?.focus();
  }

  function handleInput(num: number, pos: number, len: number, raw: string) {
    const ch = raw.slice(-1).toLowerCase().replace(/[^a-z]/g, "");
    const current = (answers[num - 1] || "").padEnd(len, " ").split("");
    current[pos] = ch || " ";
    onChangeBlank(num - 1, current.join("").trimEnd());
    if (ch) focusBox(num, pos + 1);
  }

  function handleKeyDown(
    num: number,
    pos: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) {
    if (e.key === "Backspace" && !e.currentTarget.value) {
      focusBox(num, pos - 1);
      e.preventDefault();
    }
  }

  return (
    <div className="border border-outline-variant bg-surface-container-lowest p-6 md:p-10">
      <h2 className="text-headline-md text-primary mb-2">Complete the Words</h2>
      <p className="text-body-md text-on-surface-variant mb-8">
        Fill in the missing letters. Next unlocks only after all blanks are filled.
      </p>
      <div className="text-body-lg text-on-surface" style={{ lineHeight: 2.2 }}>
        {segments.map((seg, i) => {
          if (seg.type === "text") return <span key={i}>{seg.text}</span>;

          const val = (answers[seg.number - 1] || "").padEnd(seg.missingLen, " ");
          return (
            <span
              key={i}
              className="inline-flex items-end gap-2 whitespace-nowrap mx-1 my-1"
            >
              <span className="font-bold">{seg.prefix}</span>
              <span className="inline-flex gap-1.5">
                {Array.from({ length: seg.missingLen }, (_, pos) => (
                  <input
                    key={pos}
                    ref={(el) => {
                      if (el) inputRefs.current.set(keyFor(seg.number, pos), el);
                      else inputRefs.current.delete(keyFor(seg.number, pos));
                    }}
                    value={(val[pos] || "").trim()}
                    onChange={(e) =>
                      handleInput(seg.number, pos, seg.missingLen, e.target.value)
                    }
                    onKeyDown={(e) => handleKeyDown(seg.number, pos, e)}
                    maxLength={1}
                    inputMode="text"
                    autoComplete="off"
                    autoCapitalize="none"
                    spellCheck={false}
                    className="h-8 w-7 rounded border-2 border-primary text-center text-lg font-bold lowercase focus:outline-none focus:border-accent-gold"
                  />
                ))}
              </span>
              <span className="text-body-sm text-on-surface-variant">
                ({seg.number})
              </span>
            </span>
          );
        })}
      </div>
    </div>
  );
}
