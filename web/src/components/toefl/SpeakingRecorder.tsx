"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/ui";

type RecordState = "idle" | "recording" | "recorded";

export function SpeakingRecorder({ testNumber }: { testNumber: number }) {
  const [state, setState] = useState<RecordState>("idle");
  const [audioUrl, setAudioUrl] = useState<string | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const chunksRef = useRef<Blob[]>([]);
  const streamRef = useRef<MediaStream | null>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  useEffect(() => {
    audioUrlRef.current = audioUrl;
  }, [audioUrl]);

  // Stop the mic and release the recorded blob URL when the player unmounts.
  useEffect(() => {
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      streamRef.current?.getTracks().forEach((t) => t.stop());
      if (audioUrlRef.current) URL.revokeObjectURL(audioUrlRef.current);
    };
  }, []);

  async function startRecording() {
    setError(null);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      streamRef.current = stream;
      chunksRef.current = [];

      const recorder = new MediaRecorder(stream);
      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data);
      };
      recorder.onstop = () => {
        const blob = new Blob(chunksRef.current, { type: "audio/webm" });
        setAudioUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev);
          return URL.createObjectURL(blob);
        });
        stream.getTracks().forEach((t) => t.stop());
      };

      mediaRecorderRef.current = recorder;
      recorder.start();
      setElapsed(0);
      timerRef.current = setInterval(() => setElapsed((s) => s + 1), 1000);
      setState("recording");
    } catch {
      setError("마이크에 접근할 수 없습니다. 브라우저의 마이크 권한을 확인해 주세요.");
    }
  }

  function stopRecording() {
    mediaRecorderRef.current?.stop();
    if (timerRef.current) clearInterval(timerRef.current);
    setState("recorded");
  }

  function reRecord() {
    if (audioUrl) URL.revokeObjectURL(audioUrl);
    setAudioUrl(null);
    setElapsed(0);
    setError(null);
    setState("idle");
  }

  function handleDownload() {
    if (!audioUrl) return;
    const a = document.createElement("a");
    a.href = audioUrl;
    a.download = `speaking-test${testNumber}-response.webm`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  const mm = String(Math.floor(elapsed / 60)).padStart(2, "0");
  const ss = String(elapsed % 60).padStart(2, "0");

  return (
    <div className="w-full mt-16 text-left">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="mic" className="text-primary text-xl" />
        <h2 className="text-label-md text-primary uppercase tracking-widest">
          Your Response
        </h2>
      </div>

      <div className="rounded border border-outline-variant bg-surface-container-lowest p-8 flex flex-col items-center gap-4">
        {state !== "recorded" && (
          <>
            <button
              type="button"
              onClick={state === "recording" ? stopRecording : startRecording}
              className={`w-16 h-16 rounded-full flex items-center justify-center border transition-colors ${
                state === "recording"
                  ? "bg-error text-on-error border-error animate-pulse"
                  : "bg-primary-container text-on-primary border-primary-container hover:bg-primary"
              }`}
              aria-label={state === "recording" ? "Stop recording" : "Start recording"}
            >
              <Icon name={state === "recording" ? "stop" : "mic"} className="text-3xl" />
            </button>
            <span className="text-mono-md text-on-surface-variant">
              {state === "recording" ? `Recording… ${mm}:${ss}` : "Tap to record your response"}
            </span>
          </>
        )}

        {state === "recorded" && audioUrl && (
          <div className="w-full flex flex-col items-center gap-4">
            <audio controls src={audioUrl} className="w-full" />
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={handleDownload}
                className="inline-flex items-center gap-2 bg-primary-container text-on-primary hover:bg-primary border border-primary-container rounded px-6 py-2.5 text-label-md uppercase tracking-wider transition-colors"
              >
                <Icon name="download" className="text-[18px]" />
                Download
              </button>
              <button
                type="button"
                onClick={reRecord}
                className="inline-flex items-center gap-2 bg-transparent text-primary border border-outline-variant hover:border-primary rounded px-6 py-2.5 text-label-md uppercase tracking-wider transition-colors"
              >
                <Icon name="replay" className="text-[18px]" />
                Re-record
              </button>
            </div>
          </div>
        )}

        {error && <p className="text-body-sm text-error">{error}</p>}
      </div>

      <p className="text-body-sm text-on-surface-variant mt-3">
        Nothing is uploaded — download the recording as a .webm file to keep it; it&apos;s cleared if you leave the page without downloading.
      </p>
    </div>
  );
}
