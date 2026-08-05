import { Icon } from "@/components/ui";

// Purely visual, disabled player bar — audio isn't wired up yet.
export function AudioBar({ label }: { label?: string }) {
  return (
    <div className="flex items-center gap-3 border border-outline-variant bg-surface-container-low px-4 py-3 opacity-60">
      <button
        type="button"
        disabled
        aria-label="Play audio (not available yet)"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-primary-container text-on-primary cursor-not-allowed"
      >
        <Icon name="play_arrow" className="text-xl" />
      </button>
      <div className="flex-1 h-1.5 rounded-full bg-outline-variant overflow-hidden">
        <div className="h-full w-0 bg-accent-gold" />
      </div>
      <span className="text-mono-md text-on-surface-variant shrink-0">00:00 / 00:00</span>
      {label ? (
        <span className="hidden sm:inline-block text-label-md text-on-surface-variant shrink-0 ml-2">
          {label}
        </span>
      ) : null}
    </div>
  );
}
