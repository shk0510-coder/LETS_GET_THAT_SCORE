const PART_RANGES = [
  { label: "I", from: 1, to: 6 },
  { label: "II", from: 7, to: 31 },
  { label: "III", from: 32, to: 70 },
  { label: "IV", from: 71, to: 100 },
];

export function AnswerSheet({
  current,
  answers,
  onJump,
}: {
  current: number;
  answers: Record<number, string>;
  onJump: (questionNumber: number) => void;
}) {
  return (
    <div className="sticky bottom-0 z-20 w-full border-t-2 border-primary bg-surface-container-lowest">
      <div className="w-full max-w-5xl mx-auto px-4 md:px-10 py-3">
        <div className="flex items-center gap-4 mb-2 text-[11px] text-on-surface-variant">
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-primary" /> Current
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-gold" /> Answered
          </span>
          <span className="flex items-center gap-1.5">
            <span className="h-2.5 w-2.5 rounded-full bg-surface-container" /> Unanswered
          </span>
        </div>

        <div className="max-h-[132px] overflow-y-auto">
          <div className="flex flex-wrap items-center gap-1.5">
            {PART_RANGES.map((range) => (
              <div key={range.label} className="flex flex-wrap items-center gap-1.5 mr-3">
                <span className="text-label-md text-on-surface-variant mr-0.5">
                  {range.label}
                </span>
                {Array.from(
                  { length: range.to - range.from + 1 },
                  (_, i) => range.from + i
                ).map((n) => {
                  const isAnswered = Boolean(answers[n]);
                  const isCurrent = n === current;
                  return (
                    <button
                      key={n}
                      type="button"
                      onClick={() => onJump(n)}
                      className={`flex h-7 w-7 shrink-0 items-center justify-center rounded text-[11px] font-bold transition-colors ${
                        isCurrent
                          ? "bg-primary text-on-primary"
                          : isAnswered
                            ? "bg-gold text-on-primary"
                            : "bg-surface-container text-on-surface-variant hover:bg-surface-container-high"
                      }`}
                    >
                      {n}
                    </button>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
