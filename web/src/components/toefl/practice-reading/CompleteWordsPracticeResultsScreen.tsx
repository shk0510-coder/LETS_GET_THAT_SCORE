"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Button, Container, Icon } from "@/components/ui";
import { getCompleteWordsSet } from "@/data/reading/complete-words";
import { useCompleteWordsAnswers } from "@/components/reading/complete-words/useCompleteWordsAnswers";
import { parseCompleteWordsPassage } from "@/components/reading/complete-words/parser";
import { gradeCompleteWords } from "./grade";

export function CompleteWordsPracticeResultsScreen({ practiceNumber }: { practiceNumber: number }) {
  const router = useRouter();
  const set = getCompleteWordsSet(practiceNumber);
  const { answers, reset } = useCompleteWordsAnswers(`practice-${practiceNumber}`);

  const segments = useMemo(() => (set ? parseCompleteWordsPassage(set.passage) : []), [set]);
  const grade = useMemo(() => (set ? gradeCompleteWords(set, answers) : null), [set, answers]);

  if (!set || !grade) return null;

  function handleRetake() {
    reset();
    router.push(`/toefl/practice/reading/complete-the-words/${practiceNumber}`);
  }

  return (
    <div className="flex flex-col flex-1">
      <header className="bg-primary text-on-primary">
        <Container className="py-4">
          <h1 className="text-body-md font-bold">Complete the Words — Practice {practiceNumber}</h1>
        </Container>
      </header>

      <main className="flex-grow">
        <Container className="py-12">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-8">
            <div>
              <h2 className="text-headline-lg text-primary mb-2">{set.title}</h2>
              <p className="text-body-md text-on-surface-variant">{set.topic}</p>
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
            <p className="text-label-md text-on-surface-variant uppercase tracking-widest mb-4">Passage</p>
            <p className="text-body-lg text-on-surface leading-loose mb-8">
              {segments.map((seg, i) => {
                if (seg.type === "text") return <span key={i}>{seg.text}</span>;
                const blank = set.blanks.find((b) => b.no === seg.no);
                if (!blank) return null;
                return (
                  <strong
                    key={i}
                    className="bg-gold-container text-on-gold-container px-1 mx-0.5 rounded font-bold whitespace-nowrap"
                  >
                    {blank.answer}
                    <sup className="text-[10px] font-normal ml-0.5">{blank.no}</sup>
                  </strong>
                );
              })}
            </p>

            <p className="text-label-md text-on-surface-variant uppercase tracking-widest mb-2">번역</p>
            <p className="text-body-md text-on-surface-variant leading-relaxed">{set.translation}</p>
          </div>

          <p className="text-label-md text-on-surface-variant uppercase tracking-widest mb-4">단어 해설</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {set.blanks.map((b) => {
              const given = (answers[b.no] || "").trim();
              const correctSuffix = b.answer.slice(b.revealed.length);
              const isCorrect = given.toLowerCase() === correctSuffix.toLowerCase();
              return (
                <div key={b.no} className="border border-outline-variant p-3 flex items-start gap-3">
                  <span
                    className={`text-label-md w-6 h-6 shrink-0 flex items-center justify-center rounded-full ${
                      isCorrect
                        ? "bg-secondary-container text-on-secondary-container"
                        : "bg-error-container text-on-error-container"
                    }`}
                  >
                    {b.no}
                  </span>
                  <p className="text-body-sm text-on-surface">
                    <b>{b.answer}</b>{" "}
                    <span className="text-on-surface-variant">
                      · {b.pos} · {b.meaning} · {b.note}
                    </span>
                    {!isCorrect && given && (
                      <span className="block text-on-surface-variant mt-0.5">
                        내가 쓴 답: <i>{b.revealed + given}</i>
                      </span>
                    )}
                  </p>
                </div>
              );
            })}
          </div>
        </Container>
      </main>
    </div>
  );
}
