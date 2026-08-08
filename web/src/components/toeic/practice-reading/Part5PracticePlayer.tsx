"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { getPracticeSet } from "@/data/toeic/practice/part5";
import { useToeicNav } from "../test1-listening/hooks/useToeicNav";
import { TopBar } from "../test1-listening/TopBar";
import { NavFooter } from "../test1-listening/NavFooter";
import { PaperCard } from "../test1-listening/PaperCard";
import { ConfirmModal } from "../test1-listening/ConfirmModal";
import { Part5Screen } from "../test1-reading/Part5Screen";
import { ReadingEndScreen } from "../test1-reading/ReadingEndScreen";

export function Part5PracticePlayer({ practiceNumber }: { practiceNumber: number }) {
  const router = useRouter();
  const set = getPracticeSet(practiceNumber);
  const testId = `practice-part5-${practiceNumber}`;
  const totalPages = (set?.pages.length ?? 0) + 1; // + end screen
  const nav = useToeicNav(testId, "reading", totalPages, false);
  const [showConfirm, setShowConfirm] = useState(false);

  if (!set) return null;

  function getQuestion(id: number) {
    return set!.questions.find((q) => q.id === id);
  }

  const isEndPage = nav.pageIndex === totalPages;
  const page = !isEndPage ? set.pages[nav.pageIndex - 1] : undefined;
  const unansweredCount = set.questions.length - Object.keys(nav.answers).length;
  const resultHref = `/toeic/practice/reading/part5/${practiceNumber}/result`;

  function goToResults() {
    router.push(resultHref);
  }

  function handleFinish() {
    if (unansweredCount > 0) {
      setShowConfirm(true);
      return;
    }
    goToResults();
  }

  return (
    <div className="flex flex-col flex-1">
      <TopBar
        title={set.title}
        pageIndex={nav.pageIndex}
        totalPages={totalPages}
        sectionHref="/toeic/practice-by-type?section=reading"
        onJump={nav.goTo}
        isNavLocked={false}
      />

      <main className="flex-grow py-8 px-4">
        <PaperCard>
          {page ? <Part5Screen page={page} nav={nav} getQuestion={getQuestion} /> : <ReadingEndScreen />}
        </PaperCard>
      </main>

      <NavFooter
        onBack={nav.back}
        canGoBack={nav.canGoBack}
        isNavLocked={false}
        nextLabel={isEndPage ? "Finish & Score" : "NEXT ▶▶"}
        onNext={isEndPage ? handleFinish : nav.next}
        canGoNext={isEndPage ? true : nav.canGoNext}
      />

      {showConfirm && (
        <ConfirmModal
          message={`미응답 ${unansweredCount}문항이 있습니다.\n제출하시겠습니까?`}
          confirmLabel="제출"
          cancelLabel="취소"
          onConfirm={goToResults}
          onCancel={() => setShowConfirm(false)}
        />
      )}
    </div>
  );
}
