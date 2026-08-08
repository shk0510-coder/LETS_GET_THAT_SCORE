"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Container, Icon } from "@/components/ui";
import { Choice } from "@/data/toeic/test1/reading";
import { getPracticeSet } from "@/data/toeic/practice/part5";
import { gradePart5Practice } from "./grade";
import { Part5PracticeResultDetailPanel } from "./Part5PracticeResultDetailPanel";

type Filter = "all" | "wrong" | "unanswered";
type Status = "correct" | "wrong" | "unanswered";

interface StoredNavState {
  pageIndex: number;
  answers: Record<number, Choice>;
}

function loadAnswers(testId: string): Record<number, Choice> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(`toeic-${testId}-reading-nav`);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Partial<StoredNavState>;
    return parsed.answers ?? {};
  } catch {
    return {};
  }
}

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "wrong", label: "틀린 것만" },
  { value: "unanswered", label: "미응답만" },
];

export function Part5PracticeResultsScreen({ practiceNumber }: { practiceNumber: number }) {
  const router = useRouter();
  const set = getPracticeSet(practiceNumber);
  const testId = `practice-part5-${practiceNumber}`;
  const [answers] = useState<Record<number, Choice>>(() => loadAnswers(testId));
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);

  const grade = useMemo(() => (set ? gradePart5Practice(set, answers) : null), [set, answers]);

  if (!set || !grade) return null;

  function statusFor(id: number): Status {
    const given = answers[id];
    if (given === undefined) return "unanswered";
    const question = set!.questions.find((q) => q.id === id);
    return question && given === question.answer ? "correct" : "wrong";
  }

  function handleRetake() {
    window.sessionStorage.removeItem(`toeic-${testId}-reading-nav`);
    router.push(`/toeic/practice/reading/part5/${practiceNumber}`);
  }

  const allIds = set.questions.map((q) => q.id);
  const visibleIds = allIds.filter((id) => filter === "all" || statusFor(id) === filter);

  const selectedQuestion = selectedId ? set.questions.find((q) => q.id === selectedId) : undefined;
  const selectedStatus = selectedId ? statusFor(selectedId) : null;
  const selectedAnswer = selectedId ? answers[selectedId] : undefined;

  return (
    <Container className="py-10">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
        <div>
          <h1 className="text-headline-lg text-primary mb-2">{set.title} — Results</h1>
          <p className="text-body-md text-on-surface-variant">
            Placeholder answer key — swap in the real answers and explanations later.
          </p>
        </div>
        <div className="border border-outline-variant bg-secondary-container px-6 py-4">
          <p className="text-headline-md font-bold text-primary">
            {grade.correctCount} / {grade.total}
          </p>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Button href="/toeic/practice-by-type?section=reading" variant="secondary">
          <Icon name="arrow_back" className="text-[18px]" />
          Back to Practice by Type
        </Button>
        <Button onClick={handleRetake} variant="primary">
          Retake
        </Button>
        <div className="flex-grow" />
        <div className="flex gap-2">
          {FILTERS.map(({ value, label }) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              className={`text-label-md px-4 py-2 rounded-full border transition-colors ${
                filter === value
                  ? "bg-primary text-on-primary border-primary"
                  : "border-outline-variant text-on-surface hover:border-primary"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid md:grid-cols-[1fr_340px] gap-8">
        <div className="grid grid-cols-6 sm:grid-cols-10 gap-2 content-start">
          {visibleIds.map((id) => {
            const status = statusFor(id);
            const isSelected = selectedId === id;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setSelectedId(id)}
                className={`h-9 text-[13px] font-semibold rounded transition-colors border-2 ${
                  isSelected ? "border-gold" : "border-transparent"
                } ${
                  status === "correct"
                    ? "bg-green-600 text-white"
                    : status === "wrong"
                      ? "bg-error text-on-error"
                      : "bg-surface-container text-on-surface-variant"
                }`}
              >
                {id}
              </button>
            );
          })}
        </div>

        <div className="hidden md:block">
          {selectedQuestion ? (
            <Part5PracticeResultDetailPanel
              question={selectedQuestion}
              status={selectedStatus}
              userAnswer={selectedAnswer}
              onClose={() => setSelectedId(null)}
            />
          ) : (
            <div className="border border-outline-variant bg-surface-container-lowest p-6 text-body-sm text-on-surface-variant">
              번호를 클릭하면 문항 상세가 여기에 표시됩니다.
            </div>
          )}
        </div>
      </div>

      {selectedId && selectedQuestion && (
        <div className="md:hidden fixed inset-0 z-50 flex items-end justify-center bg-black/50">
          <div className="w-full max-h-[85vh] overflow-y-auto bg-surface-container-lowest border-t border-outline-variant p-5">
            <Part5PracticeResultDetailPanel
              question={selectedQuestion}
              status={selectedStatus}
              userAnswer={selectedAnswer}
              onClose={() => setSelectedId(null)}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
