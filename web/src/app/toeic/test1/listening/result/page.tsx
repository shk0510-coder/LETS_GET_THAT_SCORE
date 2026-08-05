import { ToeicResultsScreen } from "@/components/toeic/test1-listening/ToeicResultsScreen";

export default function ToeicTest1ListeningResultPage() {
  return (
    <ToeicResultsScreen
      testId="test1"
      sectionHref="/toeic/section-practice?section=listening"
      retakeHref="/toeic/test1/listening"
    />
  );
}
