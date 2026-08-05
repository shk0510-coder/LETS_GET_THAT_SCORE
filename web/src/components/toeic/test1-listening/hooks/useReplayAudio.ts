"use client";

import { useCallback, useRef, useState } from "react";

const MOCK_ENV = process.env.NEXT_PUBLIC_TOEIC_AUDIO_MOCK === "true";
const MOCK_DURATION_MS = 3000;

export interface UseReplayAudioResult {
  playingId: string | null;
  play: (id: string, src: string) => void;
}

/**
 * Unlimited, unlocked audio replay for the results page — no sequential lock,
 * no 2-play cap (per spec: "결과 페이지에서는 재생 횟수 제한 없음").
 * Falls back to a 3s simulated playback the same way the test player does.
 */
export function useReplayAudio(): UseReplayAudioResult {
  const [playingId, setPlayingId] = useState<string | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const play = useCallback(
    (id: string, src: string) => {
      if (playingId) return;
      setPlayingId(id);

      const finish = () => {
        setPlayingId(null);
        audioRef.current = null;
      };

      if (MOCK_ENV) {
        timerRef.current = setTimeout(finish, MOCK_DURATION_MS);
        return;
      }

      let settled = false;
      const fallback = () => {
        if (settled) return;
        settled = true;
        timerRef.current = setTimeout(finish, MOCK_DURATION_MS);
      };

      const audio = new Audio(src);
      audioRef.current = audio;
      audio.addEventListener("ended", () => {
        if (settled) return;
        settled = true;
        finish();
      });
      audio.addEventListener("error", fallback);
      audio.play().catch(fallback);
    },
    [playingId],
  );

  return { playingId, play };
}
