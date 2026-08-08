import { notFound } from "next/navigation";
import { PRACTICE_COMPLETE_WORDS } from "@/data/reading/complete-words";
import { CompleteWordsPracticePlayer } from "@/components/toefl/practice-reading/CompleteWordsPracticePlayer";

export function generateStaticParams() {
  return PRACTICE_COMPLETE_WORDS.map((s) => ({ practiceId: String(s.practiceNumber) }));
}

export default async function CompleteWordsPracticePage({
  params,
}: {
  params: Promise<{ practiceId: string }>;
}) {
  const { practiceId } = await params;
  const practiceNumber = Number(practiceId);
  const exists = PRACTICE_COMPLETE_WORDS.some((s) => s.practiceNumber === practiceNumber);
  if (!exists) notFound();

  return <CompleteWordsPracticePlayer practiceNumber={practiceNumber} />;
}
