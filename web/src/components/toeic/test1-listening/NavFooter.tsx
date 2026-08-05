"use client";

import { Button, Container } from "@/components/ui";

export function NavFooter({
  onBack,
  onNext,
  canGoBack,
  canGoNext,
  nextLabel,
  isNavLocked,
}: {
  onBack: () => void;
  onNext: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  nextLabel: string;
  isNavLocked: boolean;
}) {
  return (
    <footer className="sticky bottom-0 bg-surface-container-lowest border-t border-outline-variant">
      <Container className="py-4 flex items-center gap-4">
        <Button variant="secondary" onClick={onBack} disabled={!canGoBack}>
          ◀◀ Back
        </Button>
        <div className="flex-grow text-center">
          {isNavLocked && (
            <span className="text-body-sm text-error">오디오 재생 중에는 이동할 수 없습니다</span>
          )}
        </div>
        <Button variant="primary" onClick={onNext} disabled={!canGoNext}>
          {nextLabel}
        </Button>
      </Container>
    </footer>
  );
}
