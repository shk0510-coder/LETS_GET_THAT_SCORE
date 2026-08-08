"use client";

import { useMemo, useRef } from "react";
import { CompleteWordsPassage } from "@/data/reading/complete-words";
import { parseCompleteWordsPassage } from "./parser";

/**
 * The standard "Complete the Words" input screen — one underline slot per
 * missing letter (TOEFL iBT digital-exam style: prefix + individual
 * underline marks, e.g. "cur_ _ _ _ _"), auto-advancing focus as each
 * letter is typed. Meant to be reusable as-is anywhere a single Complete
 * the Words passage needs to render (standalone practice today; Section
 * Practice / Full-length Test modules later) — pass a passage + external
 * answers state and it just works.
 */
export function CompleteWordsScreen({
  passage,
  answers,
  onChangeBlank,
}: {
  passage: CompleteWordsPassage;
  answers: Record<number, string>;
  onChangeBlank: (no: number, value: string) => void;
}) {
  const segments = useMemo(() => parseCompleteWordsPassage(passage.passage), [passage.passage]);
  const blankByNo = useMemo(() => new Map(passage.blanks.map((b) => [b.no, b])), [passage.blanks]);
  const inputRefs = useRef(new Map<string, HTMLInputElement>());

  function keyFor(no: number, pos: number) {
    return `${no}-${pos}`;
  }

  function focusBox(no: number, pos: number) {
    inputRefs.current.get(keyFor(no, pos))?.focus();
  }

  function handleInput(no: number, pos: number, missingLen: number, raw: string) {
    const ch = raw.slice(-1).toLowerCase().replace(/[^a-z]/g, "");
    const current = (answers[no] || "").padEnd(missingLen, " ").split("");
    current[pos] = ch || " ";
    onChangeBlank(no, current.join("").trimEnd());
    if (ch) focusBox(no, pos + 1);
  }

  function handleKeyDown(no: number, pos: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace" && !e.currentTarget.value) {
      focusBox(no, pos - 1);
      e.preventDefault();
    }
  }

  return (
    <div className="border border-outline-variant bg-surface-container-lowest p-6 md:p-10">
      <p className="text-label-md text-primary-container uppercase tracking-widest mb-2">{passage.topic}</p>
      <h2 className="text-headline-md text-primary mb-6">{passage.title}</h2>
      <p className="text-body-lg text-on-surface leading-loose">
        {segments.map((seg, i) => {
          if (seg.type === "text") return <span key={i}>{seg.text}</span>;

          const blank = blankByNo.get(seg.no);
          if (!blank) return null;
          const missingLen = blank.answer.length - blank.revealed.length;
          const val = (answers[seg.no] || "").padEnd(missingLen, " ");

          return (
            <span key={i} className="inline whitespace-nowrap">
              <strong className="font-bold">{blank.revealed}</strong>
              {Array.from({ length: missingLen }, (_, pos) => (
                <input
                  key={pos}
                  ref={(el) => {
                    if (el) inputRefs.current.set(keyFor(seg.no, pos), el);
                    else inputRefs.current.delete(keyFor(seg.no, pos));
                  }}
                  value={(val[pos] || "").trim()}
                  onChange={(e) => handleInput(seg.no, pos, missingLen, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(seg.no, pos, e)}
                  maxLength={1}
                  inputMode="text"
                  autoComplete="off"
                  autoCapitalize="none"
                  spellCheck={false}
                  aria-label={`Blank ${seg.no}, letter ${pos + 1} of ${missingLen}`}
                  className="w-5 mx-px border-0 border-b-2 border-primary bg-transparent text-center text-body-lg font-bold leading-none lowercase focus:outline-none focus:border-accent-gold"
                />
              ))}
              <sup className="text-[10px] text-on-surface-variant ml-0.5 select-none">{seg.no}</sup>
            </span>
          );
        })}
      </p>
    </div>
  );
}
