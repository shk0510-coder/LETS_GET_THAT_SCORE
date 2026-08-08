import { notFound } from "next/navigation";
import { PRACTICE_DAILY_LIFE } from "@/data/reading/daily-life";
import { DailyLifePracticeResultsScreen } from "@/components/toefl/practice-reading/DailyLifePracticeResultsScreen";

export function generateStaticParams() {
  return PRACTICE_DAILY_LIFE.map((s) => ({ practiceId: String(s.practiceNumber) }));
}

export default async function DailyLifePracticeResultPage({
  params,
}: {
  params: Promise<{ practiceId: string }>;
}) {
  const { practiceId } = await params;
  const practiceNumber = Number(practiceId);
  const exists = PRACTICE_DAILY_LIFE.some((s) => s.practiceNumber === practiceNumber);
  if (!exists) notFound();

  return <DailyLifePracticeResultsScreen practiceNumber={practiceNumber} />;
}
