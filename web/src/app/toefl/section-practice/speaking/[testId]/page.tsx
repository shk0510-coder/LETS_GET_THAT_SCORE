import { TestPlayer } from "@/components/toefl/TestPlayer";

export default async function SpeakingTestPage({
  params,
}: {
  params: Promise<{ testId: string }>;
}) {
  const { testId } = await params;
  const testNumber = Number(testId.replace(/\D/g, "")) || 1;

  return (
    <TestPlayer
      skillLabel="Speaking"
      testNumber={testNumber}
      sectionHref="/toefl/section-practice?section=speaking"
    />
  );
}
