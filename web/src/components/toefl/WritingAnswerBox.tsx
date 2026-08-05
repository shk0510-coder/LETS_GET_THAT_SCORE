"use client";

import { useState } from "react";
import { Icon } from "@/components/ui";

export function WritingAnswerBox({ testNumber }: { testNumber: number }) {
  const [answer, setAnswer] = useState("");
  const [downloadedAt, setDownloadedAt] = useState<string | null>(null);

  function handleDownload() {
    const blob = new Blob([answer], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `writing-test${testNumber}-response.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    setDownloadedAt(new Date().toLocaleTimeString());
  }

  const wordCount = answer.trim() ? answer.trim().split(/\s+/).length : 0;

  return (
    <div className="w-full mt-16 text-left">
      <div className="flex items-center gap-2 mb-4">
        <Icon name="edit_note" className="text-primary text-xl" />
        <h2 className="text-label-md text-primary uppercase tracking-widest">
          Your Response
        </h2>
      </div>

      <textarea
        value={answer}
        onChange={(e) => {
          setAnswer(e.target.value);
          setDownloadedAt(null);
        }}
        rows={10}
        placeholder="Type your response here..."
        className="w-full rounded border border-outline-variant bg-surface-container-lowest p-4 text-body-md text-on-surface leading-relaxed focus:outline-none focus:border-primary transition-colors resize-y"
      />

      <div className="flex items-center justify-between mt-3">
        <span className="text-body-sm text-on-surface-variant">
          {wordCount} {wordCount === 1 ? "word" : "words"}
          {downloadedAt ? ` · Downloaded at ${downloadedAt}` : ""}
        </span>
        <button
          type="button"
          onClick={handleDownload}
          disabled={!answer.trim()}
          className="inline-flex items-center gap-2 bg-primary-container text-on-primary hover:bg-primary border border-primary-container rounded px-6 py-2.5 text-label-md uppercase tracking-wider transition-colors disabled:opacity-50 disabled:pointer-events-none"
        >
          <Icon name="download" className="text-[18px]" />
          Save Response
        </button>
      </div>

      <p className="text-body-sm text-on-surface-variant mt-3">
        Nothing is uploaded — this downloads your response as a .txt file to your computer.
      </p>
    </div>
  );
}
