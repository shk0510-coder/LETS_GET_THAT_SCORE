"use client";

import { Button } from "@/components/ui";

export function ConfirmModal({
  message,
  confirmLabel = "제출",
  cancelLabel = "취소",
  onConfirm,
  onCancel,
}: {
  message: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void;
  onCancel: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="w-full max-w-sm bg-white text-[#1a1a1a] border border-black/10 p-6">
        <p className="text-[15px] leading-relaxed mb-6 whitespace-pre-line">{message}</p>
        <div className="flex justify-end gap-3">
          <Button variant="secondary" onClick={onCancel}>
            {cancelLabel}
          </Button>
          <Button variant="primary" onClick={onConfirm}>
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
