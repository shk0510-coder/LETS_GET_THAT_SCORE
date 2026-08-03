import { Button, Icon } from "@/components/ui";
import { GradedItem, ModuleScore } from "./grade";

export function ResultsScreen({
  reviewed,
  total,
  correct,
  moduleScores,
  sectionHref,
}: {
  reviewed: GradedItem[];
  total: number;
  correct: number;
  moduleScores: ModuleScore[];
  sectionHref: string;
}) {
  return (
    <div>
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
        <div>
          <h1 className="text-headline-lg text-primary mb-2">
            Answer Key &amp; Explanations
          </h1>
          <p className="text-body-md text-on-surface-variant">
            Review your answers below.
          </p>
        </div>
        <div className="border border-outline-variant bg-secondary-container px-6 py-4">
          <p className="text-headline-md font-bold text-primary">
            {correct} / {total}
          </p>
          <p className="text-body-sm text-on-secondary-container mt-1">
            {moduleScores
              .map((s, i) => `Module ${i + 1}: ${s.correct}/${s.total}`)
              .join(" • ")}
          </p>
        </div>
      </div>

      <Button href={sectionHref} variant="primary" className="mb-10">
        <Icon name="arrow_back" className="text-[18px]" />
        Back to Section Practice
      </Button>

      <div className="flex flex-col gap-4">
        {reviewed.map((r, i) => (
          <div
            key={i}
            className="border border-outline-variant bg-surface-container-lowest p-5"
          >
            <div className="flex items-center justify-between gap-4 mb-2 flex-wrap">
              <span className="text-label-md text-on-surface-variant">
                Module {r.module} • Q{r.number} • {r.prompt}
              </span>
              <span
                className={`text-label-md px-3 py-1 rounded-full ${
                  r.isCorrect
                    ? "bg-secondary-container text-on-secondary-container"
                    : "bg-error-container text-on-error-container"
                }`}
              >
                {r.isCorrect ? "Correct" : "Incorrect"}
              </span>
            </div>
            <p className="text-body-sm text-on-surface-variant">
              <b>Your answer:</b>{" "}
              {r.userAnswer ? r.userAnswer : <i>(no answer)</i>}
            </p>
            <p className="text-body-sm text-on-surface-variant">
              <b>Correct answer:</b> {r.correctAnswer}
            </p>
            <p className="text-body-sm text-on-surface mt-2 whitespace-pre-line">
              <b>Explanation:</b> {r.explanation}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
