"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Button, Container, Icon } from "@/components/ui";
import { Choice, getAudioItemForQuestion, getQuestion } from "@/data/toeic/test1/listening";
import { gradeToeicListening } from "./grade";
import { useReplayAudio } from "./hooks/useReplayAudio";
import { ResultDetailPanel } from "./ResultDetailPanel";

type Filter = "all" | "wrong" | "unanswered";
type Status = "correct" | "wrong" | "unanswered";

interface StoredNavState {
  pageIndex: number;
  answers: Record<number, Choice>;
}

function loadAnswers(testId: string): Record<number, Choice> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(`toeic-${testId}-listening-nav`);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as Partial<StoredNavState>;
    return parsed.answers ?? {};
  } catch {
    return {};
  }
}

const PART_LABELS: Record<1 | 2 | 3 | 4, string> = {
  1: "Part 1",
  2: "Part 2",
  3: "Part 3",
  4: "Part 4",
};

const FILTERS: { value: Filter; label: string }[] = [
  { value: "all", label: "전체" },
  { value: "wrong", label: "틀린 것만" },
  { value: "unanswered", label: "미응답만" },
];

const ALL_QUESTION_IDS = Array.from({ length: 100 }, (_, i) => i + 1);

function statusFor(id: number, answers: Record<number, Choice>): Status {
  const given = answers[id];
  if (given === undefined) return "unanswered";
  const question = getQuestion(id);
  return question && given === question.answer ? "correct" : "wrong";
}

export function ToeicResultsScreen({
  testId,
  sectionHref,
  retakeHref,
}: {
  testId: string;
  sectionHref: string;
  retakeHref: string;
}) {
  const router = useRouter();
  const [answers] = useState<Record<number, Choice>>(() => loadAnswers(testId));
  const [filter, setFilter] = useState<Filter>("all");
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const replay = useReplayAudio();

  const grade = useMemo(() => gradeToeicListening(answers), [answers]);

  function handleRetake() {
    window.sessionStorage.removeItem(`toeic-${testId}-listening-audio`);
    window.sessionStorage.removeItem(`toeic-${testId}-listening-nav`);
    router.push(retakeHref);
  }

  const visibleIds = useMemo(
    () =>
      ALL_QUESTION_IDS.filter((id) => {
        if (filter === "all") return true;
        return statusFor(id, answers) === filter;
      }),
    [filter, answers],
  );

  const selectedQuestion = selectedId ? getQuestion(selectedId) : undefined;
  const selectedAudio = selectedId ? getAudioItemForQuestion(selectedId) : undefined;
  const selectedStatus = selectedId ? statusFor(selectedId, answers) : null;
  const selectedAnswer = selectedId ? answers[selectedId] : undefined;

  return (
    <Container className="py-10">
      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
        <div>
          <h1 className="text-headline-lg text-primary mb-2">TOEIC Listening Test 1 — Results</h1>
          <p className="text-body-md text-on-surface-variant">
            Placeholder answer key — swap in the real answers and explanations later.
          </p>
        </div>
        <div className="border border-outline-variant bg-secondary-container px-6 py-4">
          <p className="text-headline-md font-bold text-primary">
            {grade.correctCount} / {grade.total}
          </p>
          <p className="text-body-sm text-on-secondary-container mt-1">
            Estimated LC score: {grade.scaledScore} / 495
          </p>
        </div>
      </div>

      <div className="flex flex-wrap gap-3 mb-8">
        {([1, 2, 3, 4] as const).map((part) => {
          const s = grade.byPart[part];
          return (
            <span
              key={part}
              className="text-label-md px-3 py-1.5 rounded-full bg-surface-container text-on-surface border border-outline-variant"
            >
              {PART_LABELS[part]}: {s.correct}/{s.total}
            </span>
          );
        })}
      </div>

      <div className="flex flex-wrap items-center gap-3 mb-6">
        <Button href={sectionHref} variant="secondary">
          <Icon name="arrow_back" className="text-[18px]" />
          Back to Section Practice
        </Button>
        <Button onClick={handleRetake} variant="primary">
          Retake Test
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
        <div className="grid grid-cols-10 gap-2">
          {visibleIds.map((id) => {
            const status = statusFor(id, answers);
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
            <ResultDetailPanel
              question={selectedQuestion}
              status={selectedStatus}
              userAnswer={selectedAnswer}
              audioItem={selectedAudio}
              replay={replay}
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
            <ResultDetailPanel
              question={selectedQuestion}
              status={selectedStatus}
              userAnswer={selectedAnswer}
              audioItem={selectedAudio}
              replay={replay}
              onClose={() => setSelectedId(null)}
            />
          </div>
        </div>
      )}
    </Container>
  );
}
