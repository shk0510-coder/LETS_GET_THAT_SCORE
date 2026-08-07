import { ReadingResultsScreen } from "@/components/toeic/test1-reading/ReadingResultsScreen";

export default function ToeicTest1ReadingResultPage() {
  return (
    <ReadingResultsScreen
      testId="test1"
      sectionHref="/toeic/section-practice?section=reading"
      retakeHref="/toeic/test1/reading"
    />
  );
}
