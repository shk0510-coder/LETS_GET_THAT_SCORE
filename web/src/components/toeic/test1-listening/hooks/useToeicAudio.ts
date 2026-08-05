"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AudioItem } from "@/data/toeic/test1/listening";

const MOCK_ENV = process.env.NEXT_PUBLIC_TOEIC_AUDIO_MOCK === "true";
const MOCK_DURATION_MS = 3000;
const MAX_PLAYS = 2;

interface StoredAudioState {
  playCounts: Record<string, number>;
  completedOrders: number[];
}

function storageKey(testId: string) {
  return `toeic-${testId}-listening-audio`;
}

function loadStoredState(testId: string): StoredAudioState {
  if (typeof window === "undefined") return { playCounts: {}, completedOrders: [] };
  try {
    const raw = window.sessionStorage.getItem(storageKey(testId));
    if (!raw) return { playCounts: {}, completedOrders: [] };
    const parsed = JSON.parse(raw) as Partial<StoredAudioState>;
    return {
      playCounts: parsed.playCounts ?? {},
      completedOrders: Array.isArray(parsed.completedOrders) ? parsed.completedOrders : [],
    };
  } catch {
    return { playCounts: {}, completedOrders: [] };
  }
}

export interface UseToeicAudioResult {
  /** id of the audio item currently playing, or null */
  playingId: string | null;
  /** true whenever any audio is playing — callers should disable BACK/NEXT/jump while true */
  isNavLocked: boolean;
  isUnlocked: (item: AudioItem) => boolean;
  remainingPlays: (item: AudioItem) => number;
  canPlay: (item: AudioItem) => boolean;
  play: (item: AudioItem) => void;
}

/**
 * Global sequential audio lock + 2-play cap for the TOEIC Listening player.
 * Falls back to a 3s simulated playback when NEXT_PUBLIC_TOEIC_AUDIO_MOCK=true,
 * or automatically when a real audio file 404s/fails (no audio files exist yet).
 */
export function useToeicAudio(testId: string): UseToeicAudioResult {
  const [playCounts, setPlayCounts] = useState<Record<string, number>>(
    () => loadStoredState(testId).playCounts,
  );
  const [completedOrders, setCompletedOrders] = useState<Set<number>>(
    () => new Set(loadStoredState(testId).completedOrders),
  );
  const [playingId, setPlayingId] = useState<string | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mockTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const payload: StoredAudioState = {
      playCounts,
      completedOrders: Array.from(completedOrders),
    };
    window.sessionStorage.setItem(storageKey(testId), JSON.stringify(payload));
  }, [testId, playCounts, completedOrders]);

  useEffect(() => {
    return () => {
      if (mockTimerRef.current) clearTimeout(mockTimerRef.current);
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const finishPlaying = useCallback((item: AudioItem) => {
    setPlayCounts((prev) => ({ ...prev, [item.id]: (prev[item.id] ?? 0) + 1 }));
    setCompletedOrders((prev) => {
      const next = new Set(prev);
      next.add(item.order);
      return next;
    });
    setPlayingId(null);
    audioRef.current = null;
  }, []);

  const isUnlocked = useCallback(
    (item: AudioItem) => item.order === 1 || completedOrders.has(item.order - 1),
    [completedOrders],
  );

  const remainingPlays = useCallback(
    (item: AudioItem) => MAX_PLAYS - (playCounts[item.id] ?? 0),
    [playCounts],
  );

  const canPlay = useCallback(
    (item: AudioItem) => playingId === null && isUnlocked(item) && remainingPlays(item) > 0,
    [playingId, isUnlocked, remainingPlays],
  );

  const play = useCallback(
    (item: AudioItem) => {
      if (!canPlay(item)) return;
      setPlayingId(item.id);

      if (MOCK_ENV) {
        mockTimerRef.current = setTimeout(() => finishPlaying(item), MOCK_DURATION_MS);
        return;
      }

      // 404/missing-file error and play() rejection can both fire for the same
      // failed load — guard so the fallback only ever fires once per play().
      let settled = false;
      const scheduleFallback = () => {
        if (settled) return;
        settled = true;
        mockTimerRef.current = setTimeout(() => finishPlaying(item), MOCK_DURATION_MS);
      };

      const audio = new Audio(item.src);
      audioRef.current = audio;
      audio.addEventListener("ended", () => {
        if (settled) return;
        settled = true;
        finishPlaying(item);
      });
      // dev fallback: audio file not present yet, simulate playback so the lock chain is testable
      audio.addEventListener("error", scheduleFallback);
      audio.play().catch(scheduleFallback);
    },
    [canPlay, finishPlaying],
  );

  return {
    playingId,
    isNavLocked: playingId !== null,
    isUnlocked,
    remainingPlays,
    canPlay,
    play,
  };
}
