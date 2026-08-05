"use client";

import { Icon } from "@/components/ui";
import { AudioItem } from "@/data/toeic/test1/listening";
import { UseToeicAudioResult } from "./hooks/useToeicAudio";

const SIZE_CLASSES = {
  md: { button: "h-14 w-14", icon: "text-[26px]", count: "text-[11px]" },
  sm: { button: "h-8 w-8", icon: "text-[16px]", count: "text-[9px]" },
} as const;

export function SpeakerButton({
  item,
  audio,
  label,
  size = "md",
}: {
  item: AudioItem;
  audio: UseToeicAudioResult;
  label?: string;
  size?: "md" | "sm";
}) {
  const unlocked = audio.isUnlocked(item);
  const remaining = audio.remainingPlays(item);
  const isPlaying = audio.playingId === item.id;
  const disabled = !audio.canPlay(item);
  const dims = SIZE_CLASSES[size];

  const title = !unlocked
    ? "이전 오디오를 먼저 들어주세요"
    : remaining <= 0
      ? "재생 횟수를 모두 사용했습니다"
      : undefined;

  return (
    <div className="flex flex-col items-center gap-1">
      <button
        type="button"
        onClick={() => audio.play(item)}
        disabled={disabled}
        title={title}
        aria-label={label ?? `Play audio ${item.id}`}
        className={`flex items-center justify-center rounded-full border-2 transition-colors ${dims.button} ${
          isPlaying
            ? "border-gold bg-gold-container text-on-gold-container animate-pulse"
            : disabled
              ? "border-[#ccc] text-[#999] cursor-not-allowed"
              : "border-primary text-primary hover:bg-secondary-container"
        }`}
      >
        <Icon name={isPlaying ? "graphic_eq" : "volume_up"} className={dims.icon} />
      </button>
      <span className={`${dims.count} text-[#888]`}>{remaining}/2</span>
    </div>
  );
}
