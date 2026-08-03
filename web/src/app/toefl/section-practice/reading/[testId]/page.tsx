import { notFound } from "next/navigation";
import { getReadingTest, READING_TEST_IDS } from "@/data/reading";
import { ReadingTestRunner } from "@/components/reading/ReadingTestRunner";

export function generateStaticParams() {
  return READING_TEST_IDS.map((testId) => ({ testId }));
}

export default async function ReadingTestPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = await params;
  const test = getReadingTest(testId);
  if (!test) notFound();

  return (
    <ReadingTestRunner
      test={test}
      sectionHref="/toefl/section-practice?section=reading"
    />
  );
}
