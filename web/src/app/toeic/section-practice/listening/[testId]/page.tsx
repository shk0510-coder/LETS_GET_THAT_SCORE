import { notFound } from "next/navigation";
import { getToeicListeningTest } from "@/data/toeic/listening/test1";
import { ToeicListeningPlayer } from "@/components/toeic/listening/ToeicListeningPlayer";

export function generateStaticParams() {
  return [{ testId: "test1" }];
}

export default async function ToeicListeningTestPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = await params;
  const testNumber = Number(testId.replace(/\D/g, "")) || 0;
  const test = getToeicListeningTest(testNumber);
  if (!test) notFound();

  return (
    <ToeicListeningPlayer test={test} sectionHref="/toeic/section-practice?section=listening" />
  );
}
