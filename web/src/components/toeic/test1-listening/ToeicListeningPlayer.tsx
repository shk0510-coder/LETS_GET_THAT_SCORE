"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PAGES, QUESTIONS, TOTAL_PAGES } from "@/data/toeic/test1/listening";
import { useToeicAudio } from "./hooks/useToeicAudio";
import { useToeicNav } from "./hooks/useToeicNav";
import { TopBar } from "./TopBar";
import { NavFooter } from "./NavFooter";
import { PaperCard } from "./PaperCard";
import { IntroScreen } from "./IntroScreen";
import { Part1Screen } from "./Part1Screen";
import { Part2Screen } from "./Part2Screen";
import { Part34Screen } from "./Part34Screen";
import { EndScreen } from "./EndScreen";
import { ConfirmModal } from "./ConfirmModal";

export function ToeicListeningPlayer({
  testId,
  sectionHref,
}: {
  testId: string;
  sectionHref: string;
}) {
  const router = useRouter();
  const audio = useToeicAudio(testId);
  const nav = useToeicNav(testId, TOTAL_PAGES, audio.isNavLocked);
  const [showConfirm, setShowConfirm] = useState(false);

  const page = useMemo(
    () => PAGES.find((p) => p.index === nav.pageIndex) ?? PAGES[0],
    [nav.pageIndex],
  );
  const isLastPage = nav.pageIndex === TOTAL_PAGES;
  const unansweredCount = QUESTIONS.length - Object.keys(nav.answers).length;
  const resultHref = `/toeic/${testId}/listening/result`;

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
        pageIndex={nav.pageIndex}
        totalPages={TOTAL_PAGES}
        sectionHref={sectionHref}
        onJump={nav.goTo}
        isNavLocked={audio.isNavLocked}
      />

      <main className="flex-grow py-8 px-4">
        <PaperCard>
          {page.layout === "intro" ? (
            <IntroScreen page={page} audio={audio} />
          ) : page.layout === "part1" ? (
            <Part1Screen page={page} audio={audio} nav={nav} />
          ) : page.layout === "part2" ? (
            <Part2Screen page={page} audio={audio} nav={nav} />
          ) : page.layout === "set" ? (
            <Part34Screen page={page} audio={audio} nav={nav} />
          ) : (
            <EndScreen />
          )}
        </PaperCard>
      </main>

      <NavFooter
        onBack={nav.back}
        canGoBack={nav.canGoBack}
        isNavLocked={audio.isNavLocked}
        nextLabel={isLastPage ? "Finish & Score" : "NEXT ▶▶"}
        onNext={isLastPage ? handleFinish : nav.next}
        canGoNext={isLastPage ? !audio.isNavLocked : nav.canGoNext}
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
