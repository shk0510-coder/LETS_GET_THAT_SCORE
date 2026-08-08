"use client";

import { useEffect, useState } from "react";

function storageKey(instanceId: string) {
  return `daily-life-${instanceId}-answers`;
}

function loadStoredAnswers(instanceId: string): Record<number, number> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(storageKey(instanceId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * sessionStorage-backed answers for a single Read in Daily Life passage,
 * keyed by whatever instance id the caller passes (e.g. a practice number
 * or a future test/module id), mirroring useCompleteWordsAnswers.
 */
export function useDailyLifeAnswers(instanceId: string) {
  const [answers, setAnswers] = useState<Record<number, number>>(() => loadStoredAnswers(instanceId));

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(storageKey(instanceId), JSON.stringify(answers));
  }, [instanceId, answers]);

  function setAnswer(questionNumber: number, selectedIndex: number) {
    setAnswers((prev) => ({ ...prev, [questionNumber]: selectedIndex }));
  }

  function reset() {
    setAnswers({});
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(storageKey(instanceId));
    }
  }

  return { answers, setAnswer, reset };
}
