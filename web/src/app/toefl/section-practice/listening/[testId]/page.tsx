import { notFound } from "next/navigation";
import { getListeningTest, LISTENING_TEST_IDS } from "@/data/listening";
import { ListeningTestRunner } from "@/components/listening/ListeningTestRunner";

export function generateStaticParams() {
  return LISTENING_TEST_IDS.map((testId) => ({ testId }));
}

export default async function ListeningTestPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = await params;
  const test = getListeningTest(testId);
  if (!test) notFound();

  return (
    <ListeningTestRunner
      test={test}
      sectionHref="/toefl/section-practice?section=listening"
    />
  );
}
