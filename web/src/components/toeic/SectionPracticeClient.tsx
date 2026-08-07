"use client";

import { useState } from "react";
import { Tabs } from "@/components/ui";
import { TestTile } from "@/components/ui/TestTile";
import { ToeicSectionId, TOEIC_SECTIONS, TOEIC_TEST_COUNT } from "@/lib/content";

export function SectionPracticeClient() {
  const [activeSection, setActiveSection] = useState<ToeicSectionId>("listening");
  const count = TOEIC_TEST_COUNT[activeSection];

  return (
    <>
      <Tabs
        items={TOEIC_SECTIONS}
        activeId={activeSection}
        onChange={(id) => setActiveSection(id as ToeicSectionId)}
      />
      <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-4 mt-8">
        {Array.from({ length: count }, (_, i) => i + 1).map((n) => {
          const isReady =
            (activeSection === "listening" || activeSection === "reading") && n === 1;
          return isReady ? (
            <TestTile
              key={n}
              number={n < 10 ? `0${n}` : `${n}`}
              label={`Test ${n}`}
              href={`/toeic/test${n}/${activeSection}`}
            />
          ) : (
            <TestTile
              key={n}
              number={n < 10 ? `0${n}` : `${n}`}
              label={`Test ${n}`}
              disabled
            />
          );
        })}
      </div>
    </>
  );
}
