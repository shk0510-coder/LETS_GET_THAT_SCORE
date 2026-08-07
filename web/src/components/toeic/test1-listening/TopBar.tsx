"use client";

import Link from "next/link";
import { Container, Icon } from "@/components/ui";

export function TopBar({
  title = "TOEIC Listening Test 1",
  pageIndex,
  totalPages,
  sectionHref,
  onJump,
  isNavLocked,
}: {
  title?: string;
  pageIndex: number;
  totalPages: number;
  sectionHref: string;
  onJump: (index: number) => void;
  isNavLocked: boolean;
}) {
  return (
    <header className="sticky top-0 z-10 bg-primary text-on-primary border-b border-primary-container">
      <Container className="py-3 flex items-center justify-between gap-4">
        <Link
          href={sectionHref}
          className="flex items-center gap-1 text-body-sm hover:opacity-80 transition-opacity shrink-0"
        >
          <Icon name="close" className="text-[18px]" />
          <span className="hidden sm:inline">Exit</span>
        </Link>

        <h1 className="text-body-md font-bold truncate hidden md:block">{title}</h1>

        <div className="flex items-center gap-3 shrink-0">
          <span className="text-body-sm">
            Page {pageIndex} / {totalPages}
          </span>
          <select
            value={pageIndex}
            disabled={isNavLocked}
            onChange={(e) => onJump(Number(e.target.value))}
            className="bg-primary-container text-on-primary-container text-body-sm rounded px-2 py-1.5 border border-white/20 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((n) => (
              <option key={n} value={n}>
                Page {n}
              </option>
            ))}
          </select>
        </div>
      </Container>
    </header>
  );
}
