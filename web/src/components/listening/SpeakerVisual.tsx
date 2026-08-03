function Avatar({ emoji, alt = false }: { emoji: string; alt?: boolean }) {
  return (
    <div
      className={`flex h-24 w-24 items-center justify-center rounded-2xl border text-4xl shadow-sm ${
        alt
          ? "border-primary-container/30 bg-gradient-to-b from-secondary-container to-surface-container-high"
          : "border-accent-gold/30 bg-gradient-to-b from-gold-container to-surface-container-high"
      }`}
    >
      {emoji}
    </div>
  );
}

function Label({ children }: { children: string }) {
  return (
    <div className="text-label-md uppercase tracking-wider text-on-surface-variant">
      {children}
    </div>
  );
}

export function SpeakerVisual({ type }: { type: string }) {
  if (type === "student_woman") {
    return (
      <div className="flex flex-col items-center gap-3">
        <Avatar emoji="👩" />
        <Label>Speaker</Label>
      </div>
    );
  }
  if (type === "student_man") {
    return (
      <div className="flex flex-col items-center gap-3">
        <Avatar emoji="👨" alt />
        <Label>Speaker</Label>
      </div>
    );
  }
  if (type === "conversation_students") {
    return (
      <div className="flex gap-4">
        <div className="flex flex-col items-center gap-3">
          <Avatar emoji="👩" />
          <Label>Student</Label>
        </div>
        <div className="flex flex-col items-center gap-3">
          <Avatar emoji="👨" alt />
          <Label>Student</Label>
        </div>
      </div>
    );
  }
  if (type === "announcement_campus") {
    return (
      <div className="flex flex-col items-center gap-3">
        <Avatar emoji="📢" />
        <Label>Campus Announcement</Label>
      </div>
    );
  }
  return (
    <div className="flex flex-col items-center gap-3">
      <Avatar emoji="👩‍🏫" alt />
      <Label>Academic Talk</Label>
    </div>
  );
}
