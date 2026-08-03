"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Tabs } from "@/components/ui";
import { TestTile } from "@/components/ui/TestTile";
import {
  SectionId,
  TOEFL_SECTIONS,
  TOEFL_TEST_COUNT,
  toeflTestIdFor,
} from "@/lib/content";

function isSectionId(value: string | null): value is SectionId {
  return TOEFL_SECTIONS.some((s) => s.id === value);
}

export function SectionPracticeClient() {
  const searchParams = useSearchParams();
  const initialSection = searchParams.get("section");
  const [activeSection, setActiveSection] = useState<SectionId>(
    isSectionId(initialSection) ? initialSection : "reading"
  );

  const count = TOEFL_TEST_COUNT[activeSection];

  return (
    <>
      <Tabs
        items={TOEFL_SECTIONS}
        activeId={activeSection}
        onChange={(id) => setActiveSection(id as SectionId)}
      />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-8">
        {Array.from({ length: count }, (_, i) => i + 1).map((n) => {
          const testId = toeflTestIdFor(activeSection, n);
          return (
            <TestTile
              key={testId}
              number={n < 10 ? `0${n}` : `${n}`}
              label={`Test ${n}`}
              href={`/toefl/section-practice/${activeSection}/${testId}`}
            />
          );
        })}
      </div>
    </>
  );
}
