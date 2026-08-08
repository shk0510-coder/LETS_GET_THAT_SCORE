"use client";

import { useEffect, useState } from "react";

function storageKey(instanceId: string) {
  return `complete-words-${instanceId}-answers`;
}

function loadStoredAnswers(instanceId: string): Record<number, string> {
  if (typeof window === "undefined") return {};
  try {
    const raw = window.sessionStorage.getItem(storageKey(instanceId));
    return raw ? JSON.parse(raw) : {};
  } catch {
    return {};
  }
}

/**
 * sessionStorage-backed answers for a single Complete the Words passage,
 * keyed by whatever instance id the caller passes (e.g. a practice number
 * or a future test/module id) — so progress survives a reload before the
 * user finishes, without depending on any TOEIC-specific nav hook.
 */
export function useCompleteWordsAnswers(instanceId: string) {
  const [answers, setAnswers] = useState<Record<number, string>>(() => loadStoredAnswers(instanceId));

  useEffect(() => {
    if (typeof window === "undefined") return;
    window.sessionStorage.setItem(storageKey(instanceId), JSON.stringify(answers));
  }, [instanceId, answers]);

  function setAnswer(no: number, value: string) {
    setAnswers((prev) => ({ ...prev, [no]: value }));
  }

  function reset() {
    setAnswers({});
    if (typeof window !== "undefined") {
      window.sessionStorage.removeItem(storageKey(instanceId));
    }
  }

  return { answers, setAnswer, reset };
}
