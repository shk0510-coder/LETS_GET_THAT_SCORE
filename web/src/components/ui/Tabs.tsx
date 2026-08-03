"use client";

export type TabItem = {
  id: string;
  label: string;
};

export function Tabs({
  items,
  activeId,
  onChange,
}: {
  items: TabItem[];
  activeId: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className="flex gap-10 border-b border-outline-variant overflow-x-auto pb-2">
      {items.map((item) => {
        const isActive = item.id === activeId;
        return (
          <button
            key={item.id}
            type="button"
            onClick={() => onChange(item.id)}
            className={`relative whitespace-nowrap text-label-md pb-2 transition-colors ${
              isActive
                ? "text-primary font-bold after:absolute after:left-0 after:-bottom-[1px] after:h-[2px] after:w-full after:bg-primary"
                : "text-on-surface-variant hover:text-primary"
            }`}
          >
            {item.label}
          </button>
        );
      })}
    </div>
  );
}
