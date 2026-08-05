"use client";

import { useEffect, useMemo, useState } from "react";
import { ToeicListeningTest } from "@/data/toeic/listening/test1";
import { TopBar } from "./TopBar";
import { AnswerSheet } from "./AnswerSheet";
import { Part1Screen } from "./Part1Screen";
import { Part2Screen } from "./Part2Screen";
import { Part34Screen } from "./Part34Screen";
import { partLabel, resolvePosition } from "./position";

const TOTAL_SECONDS = 45 * 60;

export function ToeicListeningPlayer({
  test,
  sectionHref,
}: {
  test: ToeicListeningTest;
  sectionHref: string;
}) {
  const [current, setCurrent] = useState(1);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [timeLeft, setTimeLeft] = useState(TOTAL_SECONDS);

  useEffect(() => {
    const id = setInterval(() => {
      setTimeLeft((t) => (t > 0 ? t - 1 : 0));
    }, 1000);
    return () => clearInterval(id);
  }, []);

  const position = useMemo(() => resolvePosition(current), [current]);

  function handleAnswer(questionNumber: number, choice: string) {
    setAnswers((prev) => ({ ...prev, [questionNumber]: choice }));
  }

  function jumpTo(questionNumber: number) {
    setCurrent(questionNumber);
    if (questionNumber >= 7 && questionNumber <= 31) {
      requestAnimationFrame(() => {
        document
          .getElementById(`q-${questionNumber}`)
          ?.scrollIntoView({ behavior: "smooth", block: "center" });
      });
    }
  }

  let body: React.ReactNode;

  if (position.part === 1) {
    body = (
      <Part1Screen
        index={position.index}
        answers={answers}
        onAnswer={handleAnswer}
        onNext={() => setCurrent(position.index === 5 ? 7 : current + 1)}
      />
    );
  } else if (position.part === 2) {
    body = (
      <Part2Screen answers={answers} onAnswer={handleAnswer} onNext={() => setCurrent(32)} />
    );
  } else if (position.part === 3) {
    const set = test.part3Sets[position.setIndex];
    const isLast = position.setIndex === test.part3Sets.length - 1;
    body = (
      <Part34Screen
        part={3}
        set={set}
        setIndex={position.setIndex}
        totalSets={test.part3Sets.length}
        answers={answers}
        onAnswer={handleAnswer}
        onNext={() => setCurrent(isLast ? 71 : set.startNumber + 3)}
      />
    );
  } else {
    const set = test.part4Sets[position.setIndex];
    const isLast = position.setIndex === test.part4Sets.length - 1;
    body = (
      <Part34Screen
        part={4}
        set={set}
        setIndex={position.setIndex}
        totalSets={test.part4Sets.length}
        answers={answers}
        onAnswer={handleAnswer}
        onNext={() => setCurrent(set.startNumber + 3)}
        finishHref={isLast ? sectionHref : undefined}
      />
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <TopBar
        testNumber={test.testNumber}
        partLabel={partLabel(position.part)}
        timeLeftSeconds={timeLeft}
        sectionHref={sectionHref}
      />

      <main className="flex-grow w-full max-w-5xl mx-auto px-4 md:px-10 py-10">{body}</main>

      <AnswerSheet current={current} answers={answers} onJump={jumpTo} />
    </div>
  );
}
