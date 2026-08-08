import { notFound } from "next/navigation";
import { PRACTICE_DAILY_LIFE } from "@/data/reading/daily-life";
import { DailyLifePracticePlayer } from "@/components/toefl/practice-reading/DailyLifePracticePlayer";

export function generateStaticParams() {
  return PRACTICE_DAILY_LIFE.map((s) => ({ practiceId: String(s.practiceNumber) }));
}

export default async function DailyLifePracticePage({
  params,
}: {
  params: Promise<{ practiceId: string }>;
}) {
  const { practiceId } = await params;
  const practiceNumber = Number(practiceId);
  const exists = PRACTICE_DAILY_LIFE.some((s) => s.practiceNumber === practiceNumber);
  if (!exists) notFound();

  return <DailyLifePracticePlayer practiceNumber={practiceNumber} />;
}
