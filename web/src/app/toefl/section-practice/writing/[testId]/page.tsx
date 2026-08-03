import { TestPlayer } from "@/components/toefl/TestPlayer";

export default async function WritingTestPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = await params;
  const testNumber = Number(testId.replace(/\D/g, "")) || 1;

  return (
    <TestPlayer
      skillLabel="Writing"
      testNumber={testNumber}
      sectionHref="/toefl/section-practice?section=writing"
    />
  );
}
