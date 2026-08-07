"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { PAGES, QUESTIONS, TOTAL_PAGES } from "@/data/toeic/test1/reading";
import { useToeicNav } from "../test1-listening/hooks/useToeicNav";
import { TopBar } from "../test1-listening/TopBar";
import { NavFooter } from "../test1-listening/NavFooter";
import { PaperCard } from "../test1-listening/PaperCard";
import { ConfirmModal } from "../test1-listening/ConfirmModal";
import { Part5Screen } from "./Part5Screen";
import { Part6Screen } from "./Part6Screen";
import { Part7SingleScreen } from "./Part7SingleScreen";
import { Part7DoubleScreen } from "./Part7DoubleScreen";
import { Part7TripleScreen } from "./Part7TripleScreen";
import { ReadingEndScreen } from "./ReadingEndScreen";

export function ToeicReadingPlayer({ testId, sectionHref }: { testId: string; sectionHref: string }) {
  const router = useRouter();
  const nav = useToeicNav(testId, "reading", TOTAL_PAGES, false);
  const [showConfirm, setShowConfirm] = useState(false);

  const page = useMemo(() => PAGES.find((p) => p.index === nav.pageIndex) ?? PAGES[0], [nav.pageIndex]);
  const isLastPage = nav.pageIndex === TOTAL_PAGES;
  const unansweredCount = QUESTIONS.length - Object.keys(nav.answers).length;
  const resultHref = `/toeic/${testId}/reading/result`;

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
        title="TOEIC Reading Test 1"
        pageIndex={nav.pageIndex}
        totalPages={TOTAL_PAGES}
        sectionHref={sectionHref}
        onJump={nav.goTo}
        isNavLocked={false}
      />

      <main className="flex-grow py-8 px-4">
        {page.layout === "part7double" ? (
          <Part7DoubleScreen page={page} nav={nav} />
        ) : page.layout === "part7triple" ? (
          <Part7TripleScreen page={page} nav={nav} />
        ) : (
          <PaperCard>
            {page.layout === "part5" ? (
              <Part5Screen page={page} nav={nav} />
            ) : page.layout === "part6" ? (
              <Part6Screen page={page} nav={nav} />
            ) : page.layout === "part7single" ? (
              <Part7SingleScreen page={page} nav={nav} />
            ) : (
              <ReadingEndScreen />
            )}
          </PaperCard>
        )}
      </main>

      <NavFooter
        onBack={nav.back}
        canGoBack={nav.canGoBack}
        isNavLocked={false}
        nextLabel={isLastPage ? "Finish & Score" : "NEXT ▶▶"}
        onNext={isLastPage ? handleFinish : nav.next}
        canGoNext={isLastPage ? true : nav.canGoNext}
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
