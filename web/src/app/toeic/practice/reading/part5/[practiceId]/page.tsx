import { notFound } from "next/navigation";
import { PRACTICE_PART5_SETS } from "@/data/toeic/practice/part5";
import { Part5PracticePlayer } from "@/components/toeic/practice-reading/Part5PracticePlayer";

export function generateStaticParams() {
  return PRACTICE_PART5_SETS.map((s) => ({ practiceId: String(s.practiceNumber) }));
}

export default async function Part5PracticePage({
  params,
}: {
  params: Promise<{ practiceId: string }>;
}) {
  const { practiceId } = await params;
  const practiceNumber = Number(practiceId);
  const exists = PRACTICE_PART5_SETS.some((s) => s.practiceNumber === practiceNumber);
  if (!exists) notFound();

  return <Part5PracticePlayer practiceNumber={practiceNumber} />;
}
