"use client";

import { useCallback, useEffect, useState } from "react";
import { Choice } from "@/data/toeic/test1/listening";

interface StoredNavState {
  pageIndex: number;
  answers: Record<number, Choice>;
}

function storageKey(testId: string) {
  return `toeic-${testId}-listening-nav`;
}

function loadStoredState(testId: string, totalPages: number): StoredNavState {
  if (typeof window === "undefined") return { pageIndex: 1, answers: {} };
  try {
    const raw = window.sessionStorage.getItem(storageKey(testId));
    if (!raw) return { pageIndex: 1, answers: {} };
    const parsed = JSON.parse(raw) as Partial<StoredNavState>;
    const pageIndex =
      typeof parsed.pageIndex === "number" && Number.isFinite(parsed.pageIndex)
        ? Math.min(Math.max(parsed.pageIndex, 1), totalPages)
        : 1;
    return { pageIndex, answers: parsed.answers ?? {} };
  } catch {
    return { pageIndex: 1, answers: {} };
  }
}

export interface UseToeicNavResult {
  pageIndex: number;
  answers: Record<number, Choice>;
  goTo: (index: number) => void;
  next: () => void;
  back: () => void;
  canGoBack: boolean;
  canGoNext: boolean;
  setAnswer: (questionId: number, choice: Choice) => void;
  answeredCount: number;
}

/**
 * Free page navigation (1 ~ totalPages) + per-question answers.
 * Navigation is refused while `isLocked` (audio playing) is true.
 * Persisted to sessionStorage so a reload keeps progress.
 */
export function useToeicNav(
  testId: string,
  totalPages: number,
  isLocked: boolean,
): UseToeicNavResult {
  const [pageIndex, setPageIndex] = useState(() => loadStoredState(testId, totalPages).pageIndex);
  const [answers, setAnswers] = useState<Record<number, Choice>>(
    () => loadStoredState(testId, totalPages).answers,
  );

  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload: StoredNavState = { pageIndex, answers };
    window.sessionStorage.setItem(storageKey(testId), JSON.stringify(payload));
  }, [testId, pageIndex, answers]);

  const goTo = useCallback(
    (index: number) => {
      if (isLocked) return;
      setPageIndex(Math.min(Math.max(index, 1), totalPages));
    },
    [isLocked, totalPages],
  );

  const next = useCallback(() => goTo(pageIndex + 1), [goTo, pageIndex]);
  const back = useCallback(() => goTo(pageIndex - 1), [goTo, pageIndex]);

  const setAnswer = useCallback((questionId: number, choice: Choice) => {
    setAnswers((prev) => {
      if (prev[questionId] === choice) {
        const next = { ...prev };
        delete next[questionId];
        return next;
      }
      return { ...prev, [questionId]: choice };
    });
  }, []);

  return {
    pageIndex,
    answers,
    goTo,
    next,
    back,
    canGoBack: !isLocked && pageIndex > 1,
    canGoNext: !isLocked && pageIndex < totalPages,
    setAnswer,
    answeredCount: Object.keys(answers).length,
  };
}
