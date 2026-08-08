"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Container, Icon } from "@/components/ui";
import { getDailyLifeSet } from "@/data/reading/daily-life";
import { MCQScreen } from "@/components/reading/MCQScreen";
import { useDailyLifeAnswers } from "@/components/reading/daily-life/useDailyLifeAnswers";

export function DailyLifePracticePlayer({ practiceNumber }: { practiceNumber: number }) {
  const router = useRouter();
  const set = getDailyLifeSet(practiceNumber);
  const { answers, setAnswer } = useDailyLifeAnswers(`practice-${practiceNumber}`);
  const [questionIndex, setQuestionIndex] = useState(0);

  if (!set) return null;

  const question = set.questions[questionIndex];
  const isAnswered = answers[question.number] != null;
  const isLast = questionIndex === set.questions.length - 1;

  function handleNext() {
    if (isLast) {
      router.push(`/toefl/practice/reading/daily-life/${practiceNumber}/result`);
      return;
    }
    setQuestionIndex((i) => i + 1);
  }

  function handleBack() {
    setQuestionIndex((i) => i - 1);
  }

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-10 bg-primary text-on-primary border-b border-primary-container">
        <Container className="py-3 flex items-center justify-between gap-4">
          <Link
            href="/toefl/practice-by-type?section=reading"
            className="flex items-center gap-1 text-body-sm hover:opacity-80 transition-opacity shrink-0"
          >
            <Icon name="close" className="text-[18px]" />
            <span className="hidden sm:inline">Exit</span>
          </Link>
          <h1 className="text-body-md font-bold truncate">Read in Daily Life</h1>
          <p className="text-body-sm opacity-90 text-right shrink-0">
            Practice {practiceNumber} • Question {questionIndex + 1}/{set.questions.length}
          </p>
        </Container>
      </header>

      <main className="flex-grow">
        <Container className="py-8">
          <p className="text-label-md text-on-surface-variant uppercase tracking-wider mb-4">
            {set.title}
          </p>
          <MCQScreen
            stimulusLabel={set.docType}
            stimulusText={set.passage}
            question={question}
            selectedIndex={answers[question.number] ?? null}
            onSelect={(i) => setAnswer(question.number, i)}
          />
        </Container>
      </main>

      <footer className="sticky bottom-0 bg-surface-container-lowest border-t border-outline-variant">
        <Container className="py-4 flex items-center gap-4">
          {questionIndex === 0 ? (
            <Button variant="secondary" href="/toefl/practice-by-type?section=reading">
              Back
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
          <div className="flex-grow" />
          <Button variant="primary" onClick={handleNext} disabled={!isAnswered}>
            {isLast ? "Finish & Score" : "Next"}
          </Button>
        </Container>
      </footer>
    </div>
  );
}
