import { notFound } from "next/navigation";
import { PRACTICE_COMPLETE_WORDS } from "@/data/reading/complete-words";
import { CompleteWordsPracticeResultsScreen } from "@/components/toefl/practice-reading/CompleteWordsPracticeResultsScreen";

export function generateStaticParams() {
  return PRACTICE_COMPLETE_WORDS.map((s) => ({ practiceId: String(s.practiceNumber) }));
}

export default async function CompleteWordsPracticeResultPage({
  params,
}: {
  params: Promise<{ practiceId: string }>;
}) {
  const { practiceId } = await params;
  const practiceNumber = Number(practiceId);
  const exists = PRACTICE_COMPLETE_WORDS.some((s) => s.practiceNumber === practiceNumber);
  if (!exists) notFound();

  return <CompleteWordsPracticeResultsScreen practiceNumber={practiceNumber} />;
}
