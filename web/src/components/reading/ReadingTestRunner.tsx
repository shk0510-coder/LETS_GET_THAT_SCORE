"use client";

import { useState } from "react";
import Link from "next/link";
import { Button, Container, Icon } from "@/components/ui";
import { ReadingTest } from "@/data/reading/types";
import { FillScreen } from "./FillScreen";
import { MCQScreen } from "./MCQScreen";
import { ResultsScreen } from "./ResultsScreen";
import { gradeTest } from "./grade";
import { getBlankMeta } from "./fillParser";
import {
  createInitialAnswers,
  mcqNumberFor,
  ModuleAnswers,
  screenTypeFor,
  SCREENS_PER_MODULE,
} from "./state";

function dailyLifeFlat(mod: ReadingTest["modules"][number]) {
  const packs = [
    mod.dailyLife.notice,
    mod.dailyLife.post,
    mod.dailyLife.message,
  ];
  return packs.flatMap((p) =>
    p.questions.map((q) => ({ stimulusLabel: p.label, stimulusText: p.text, q }))
  );
}

export function ReadingTestRunner({
  test,
  sectionHref,
}: {
  test: ReadingTest;
  sectionHref: string;
}) {
  const [view, setView] = useState<"screen" | "results">("screen");
  const [moduleIndex, setModuleIndex] = useState(0);
  const [screenIndex, setScreenIndex] = useState(0);
  const [answers, setAnswers] = useState<ModuleAnswers[]>(() =>
    createInitialAnswers(test)
  );

  const mod = test.modules[moduleIndex];
  const screenType = screenTypeFor(screenIndex);

  function isFillComplete() {
    const blanks = getBlankMeta(mod.completeWords.paragraph, mod.completeWords.answers);
    for (let i = 0; i < 10; i++) {
      const expectedLen = blanks.find((b) => b.number === i + 1)?.missingLen ?? 0;
      if ((answers[moduleIndex].fill[i] || "").length !== expectedLen) return false;
    }
    return true;
  }

  function isMcqAnswered(qnum: number | null) {
    if (qnum == null) return false;
    return answers[moduleIndex].mcq[qnum]?.selectedIndex != null;
  }

  const canNext =
    screenIndex === 0 ? isFillComplete() : isMcqAnswered(mcqNumberFor(screenIndex));
  const isLastScreenOfLastModule =
    moduleIndex === test.modules.length - 1 && screenIndex === SCREENS_PER_MODULE - 1;
  const nextLabel = isLastScreenOfLastModule ? "Finish & Score" : "Next";
  const isVeryFirstScreen = moduleIndex === 0 && screenIndex === 0;

  function handleBack() {
    if (screenIndex > 0) {
      setScreenIndex((s) => s - 1);
    } else {
      setModuleIndex((m) => m - 1);
      setScreenIndex(SCREENS_PER_MODULE - 1);
    }
  }

  function handleNext() {
    if (isLastScreenOfLastModule) {
      setView("results");
      return;
    }
    if (screenIndex < SCREENS_PER_MODULE - 1) {
      setScreenIndex((s) => s + 1);
    } else {
      setModuleIndex((m) => m + 1);
      setScreenIndex(0);
    }
  }

  function updateFillAnswer(blankIndex: number, value: string) {
    setAnswers((prev) => {
      const next = prev.map((m) => ({ ...m, fill: [...m.fill] }));
      next[moduleIndex].fill[blankIndex] = value;
      return next;
    });
  }

  function updateMcqAnswer(qnum: number, index: number) {
    setAnswers((prev) => {
      const next = prev.map((m) => ({ ...m, mcq: { ...m.mcq } }));
      next[moduleIndex].mcq[qnum] = { selectedIndex: index };
      return next;
    });
  }

  if (view === "results") {
    const graded = gradeTest(test, answers);
    return (
      <div className="flex flex-col flex-1">
        <header className="bg-primary text-on-primary">
          <Container className="py-4">
            <h1 className="text-body-md font-bold">{test.title}</h1>
          </Container>
        </header>
        <main className="flex-grow">
          <Container className="py-12">
            <ResultsScreen graded={graded} sectionHref={sectionHref} />
          </Container>
        </main>
      </div>
    );
  }

  let questionLabel = "";
  let content;

  if (screenType === "fill") {
    questionLabel = "Questions 1–10";
    content = (
      <FillScreen
        module={mod}
        answers={answers[moduleIndex].fill}
        onChangeBlank={updateFillAnswer}
      />
    );
  } else if (screenType === "daily") {
    const item = dailyLifeFlat(mod)[screenIndex - 1];
    questionLabel = `Question ${item.q.number}`;
    content = (
      <MCQScreen
        stimulusLabel={item.stimulusLabel}
        stimulusText={item.stimulusText}
        question={item.q}
        selectedIndex={answers[moduleIndex].mcq[item.q.number]?.selectedIndex ?? null}
        onSelect={(i) => updateMcqAnswer(item.q.number, i)}
      />
    );
  } else {
    const q = mod.academicPassage.questions[screenIndex - 6];
    const stimulusText = `${mod.academicPassage.title}\n\n${mod.academicPassage.passage}`;
    questionLabel = `Question ${q.number}`;
    content = (
      <MCQScreen
        stimulusLabel="PASSAGE"
        stimulusText={stimulusText}
        question={q}
        selectedIndex={answers[moduleIndex].mcq[q.number]?.selectedIndex ?? null}
        onSelect={(i) => updateMcqAnswer(q.number, i)}
      />
    );
  }

  return (
    <div className="flex flex-col flex-1">
      <header className="sticky top-0 z-10 bg-primary text-on-primary border-b border-primary-container">
        <Container className="py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <Link
              href={sectionHref}
              className="flex items-center gap-1 text-body-sm hover:opacity-80 transition-opacity shrink-0"
            >
              <Icon name="close" className="text-[18px]" />
              <span className="hidden sm:inline">Exit</span>
            </Link>
            <h1 className="text-body-md font-bold truncate">{test.title}</h1>
          </div>
          <p className="text-body-sm opacity-90 text-right shrink-0">
            Module {moduleIndex + 1} of {test.modules.length} • {questionLabel}
          </p>
        </Container>
      </header>

      <main className="flex-grow">
        <Container className="py-8">
          <p className="text-label-md text-on-surface-variant uppercase tracking-wider mb-4">
            {mod.title}
          </p>
          {content}
        </Container>
      </main>

      <footer className="sticky bottom-0 bg-surface-container-lowest border-t border-outline-variant">
        <Container className="py-4 flex items-center gap-4">
          {isVeryFirstScreen ? (
            <Button variant="secondary" href={sectionHref}>
              Back
            </Button>
          ) : (
            <Button variant="secondary" onClick={handleBack}>
              Back
            </Button>
          )}
          <div className="flex-grow" />
          <Button variant="primary" onClick={handleNext} disabled={!canNext}>
            {nextLabel}
          </Button>
        </Container>
      </footer>
    </div>
  );
}
