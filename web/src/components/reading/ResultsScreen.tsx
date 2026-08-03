import { Button, Icon } from "@/components/ui";
import { GradedItem } from "./grade";

export function ResultsScreen({
  graded,
  sectionHref,
}: {
  graded: GradedItem[];
  sectionHref: string;
}) {
  const total = graded.length;
  const correct = graded.filter((r) => r.isCorrect).length;

  const byModule = new Map<number, { total: number; correct: number }>();
  graded.forEach((r) => {
    const entry = byModule.get(r.module) ?? { total: 0, correct: 0 };
    entry.total++;
    if (r.isCorrect) entry.correct++;
    byModule.set(r.module, entry);
  });

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
            {Array.from(byModule.entries())
              .map(([m, s]) => `Module ${m}: ${s.correct}/${s.total}`)
              .join(" • ")}
          </p>
        </div>
      </div>

      <Button href={sectionHref} variant="primary" className="mb-10">
        <Icon name="arrow_back" className="text-[18px]" />
        Back to Section Practice
      </Button>

      <div className="flex flex-col gap-4">
        {graded.map((r, i) => (
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
            <p className="text-body-md font-semibold text-on-surface mb-2">
              {r.question}
            </p>
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
