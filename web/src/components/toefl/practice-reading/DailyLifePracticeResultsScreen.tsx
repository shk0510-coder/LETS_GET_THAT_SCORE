"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button, Container, Icon } from "@/components/ui";
import { getDailyLifeSet } from "@/data/reading/daily-life";
import { useDailyLifeAnswers } from "@/components/reading/daily-life/useDailyLifeAnswers";
import { gradeDailyLife } from "./dailyLifeGrade";

export function DailyLifePracticeResultsScreen({ practiceNumber }: { practiceNumber: number }) {
  const router = useRouter();
  const set = getDailyLifeSet(practiceNumber);
  const { answers, reset } = useDailyLifeAnswers(`practice-${practiceNumber}`);

  const grade = useMemo(() => (set ? gradeDailyLife(set, answers) : null), [set, answers]);

  if (!set || !grade) return null;

  function handleRetake() {
    reset();
    router.push(`/toefl/practice/reading/daily-life/${practiceNumber}`);
  }

  return (
    <div className="flex flex-col flex-1">
      <header className="bg-primary text-on-primary">
        <Container className="py-4">
          <h1 className="text-body-md font-bold">Read in Daily Life — Practice {practiceNumber}</h1>
        </Container>
      </header>

      <main className="flex-grow">
        <Container className="py-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-headline-lg text-primary mb-2">{set.title}</h2>
              <p className="text-body-md text-on-surface-variant">{set.docType}</p>
            </div>
            <div className="border border-outline-variant bg-secondary-container px-6 py-4">
              <p className="text-headline-md font-bold text-primary">
                {grade.correctCount} / {grade.total}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 mb-10">
            <Button href="/toefl/practice-by-type?section=reading" variant="secondary">
              <Icon name="arrow_back" className="text-[18px]" />
              Back to Practice by Type
            </Button>
            <Button onClick={handleRetake} variant="primary">
              Retake
            </Button>
          </div>

          <div className="border border-outline-variant bg-surface-container-lowest p-6 md:p-10 mb-8">
            <p className="text-label-md text-on-surface-variant uppercase tracking-widest mb-4">
              {set.docType}
            </p>
            <p className="text-body-lg text-on-surface leading-loose whitespace-pre-wrap mb-8">
              {set.passage}
            </p>

            <p className="text-label-md text-on-surface-variant uppercase tracking-widest mb-2">번역</p>
            <p className="text-body-md text-on-surface-variant leading-relaxed whitespace-pre-wrap">
              {set.translation}
            </p>
          </div>

          <p className="text-label-md text-on-surface-variant uppercase tracking-widest mb-4">해설</p>
          <div className="flex flex-col gap-3">
            {set.questions.map((q) => {
              const result = grade.results.find((r) => r.number === q.number);
              const isCorrect = result?.isCorrect ?? false;
              const selectedIndex = result?.selectedIndex ?? null;
              return (
                <div key={q.number} className="border border-outline-variant p-4">
                  <div className="flex items-start gap-3 mb-3">
                    <span
                      className={`text-label-md w-6 h-6 shrink-0 flex items-center justify-center rounded-full ${
                        isCorrect
                          ? "bg-secondary-container text-on-secondary-container"
                          : "bg-error-container text-on-error-container"
                      }`}
                    >
                      {q.number}
                    </span>
                    <p className="text-body-md font-semibold text-on-surface">{q.question}</p>
                  </div>
                  <div className="flex flex-col gap-1.5 mb-3 pl-9">
                    {q.choices.map((choice, i) => {
                      const isAnswer = i === q.answerIndex;
                      const isSelected = i === selectedIndex;
                      return (
                        <p
                          key={i}
                          className={`text-body-sm flex items-start gap-2 ${
                            isAnswer
                              ? "text-primary font-bold"
                              : isSelected
                                ? "text-on-error-container"
                                : "text-on-surface-variant"
                          }`}
                        >
                          <span className="shrink-0">{"ABCD"[i]}.</span>
                          <span>
                            {choice}
                            {isAnswer && " ✓"}
                            {isSelected && !isAnswer && " (내가 고른 답)"}
                          </span>
                        </p>
                      );
                    })}
                  </div>
                  <p className="text-body-sm text-on-surface-variant pl-9">{q.explanation}</p>
                </div>
              );
            })}
          </div>
        </Container>
      </main>
    </div>
  );
}
