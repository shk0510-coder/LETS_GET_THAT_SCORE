"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Container, Icon } from "@/components/ui";
import { getCompleteWordsSet } from "@/data/reading/complete-words";
import { CompleteWordsScreen } from "@/components/reading/complete-words/CompleteWordsScreen";
import { useCompleteWordsAnswers } from "@/components/reading/complete-words/useCompleteWordsAnswers";

export function CompleteWordsPracticePlayer({ practiceNumber }: { practiceNumber: number }) {
  const router = useRouter();
  const set = getCompleteWordsSet(practiceNumber);
  const { answers, setAnswer } = useCompleteWordsAnswers(`practice-${practiceNumber}`);

  if (!set) return null;

  const filledCount = set.blanks.filter((b) => {
    const missingLen = b.answer.length - b.revealed.length;
    return (answers[b.no] || "").trim().length === missingLen;
  }).length;
  const canFinish = filledCount === set.blanks.length;

  function handleFinish() {
    router.push(`/toefl/practice/reading/complete-the-words/${practiceNumber}/result`);
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
          <h1 className="text-body-md font-bold truncate">Complete the Words</h1>
          <p className="text-body-sm opacity-90 text-right shrink-0">
            Practice {practiceNumber} • {filledCount}/{set.blanks.length}
          </p>
        </Container>
      </header>

      <main className="flex-grow">
        <Container className="py-8">
          <CompleteWordsScreen passage={set} answers={answers} onChangeBlank={setAnswer} />
        </Container>
      </main>

      <footer className="sticky bottom-0 bg-surface-container-lowest border-t border-outline-variant">
        <Container className="py-4 flex items-center gap-4">
          <Button variant="secondary" href="/toefl/practice-by-type?section=reading">
            Back
          </Button>
          <div className="flex-grow" />
          <Button variant="primary" onClick={handleFinish} disabled={!canFinish}>
            Finish & Score
          </Button>
        </Container>
      </footer>
    </div>
  );
}
