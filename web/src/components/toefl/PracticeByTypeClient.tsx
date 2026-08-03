"use client";

import { useMemo, useState } from "react";
import { Tabs } from "@/components/ui";
import { TestTile } from "@/components/ui/TestTile";
import { SectionId, TOEFL_PRACTICE_TYPES, TOEFL_SECTIONS } from "@/lib/content";

export function PracticeByTypeClient() {
  const [activeSection, setActiveSection] = useState<SectionId>("reading");
  const [activeTypeIndex, setActiveTypeIndex] = useState(0);

  const types = TOEFL_PRACTICE_TYPES[activeSection];
  const activeType = types[activeTypeIndex] ?? types[0];

  const secondaryTabs = useMemo(
    () => types.map((t, i) => ({ id: `${i}`, label: t.label })),
    [types]
  );

  return (
    <>
      <Tabs
        items={TOEFL_SECTIONS}
        activeId={activeSection}
        onChange={(id) => {
          setActiveSection(id as SectionId);
          setActiveTypeIndex(0);
        }}
      />
      <div className="mt-6 mb-12">
        <Tabs
          items={secondaryTabs}
          activeId={`${activeTypeIndex}`}
          onChange={(id) => setActiveTypeIndex(Number(id))}
        />
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {Array.from({ length: activeType.count }, (_, i) => i + 1).map((n) => (
          <TestTile
            key={n}
            number={n < 10 ? `0${n}` : `${n}`}
            label={`Practice ${n}`}
            disabled
          />
        ))}
      </div>
    </>
  );
}
