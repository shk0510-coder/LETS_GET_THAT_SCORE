/**
 * The A4 "test book" surface (210:297 ratio). Deliberately plain white paper
 * + near-black text regardless of the app's navy/gold theme (and regardless
 * of the site-wide Inter font) — the paper must read like the real TOEIC
 * test book. Navy/gold and Inter stay confined to the surrounding chrome.
 * aspect-ratio only sets the *preferred* height — pages with more content
 * than one A4 sheet holds still grow taller instead of clipping.
 */
export function PaperCard({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mx-auto w-full max-w-[960px] aspect-[210/297] bg-white text-[#1a1a1a] border border-[#d0d0d0] px-6 py-10 sm:px-10 md:px-16 md:py-14"
      style={{ fontFamily: "Arial, Helvetica, 'Helvetica Neue', sans-serif" }}
    >
      {children}
    </div>
  );
}
