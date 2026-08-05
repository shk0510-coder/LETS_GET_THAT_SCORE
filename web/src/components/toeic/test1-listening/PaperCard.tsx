/**
 * The A4-ish "test book" surface. Deliberately plain white + near-black text
 * regardless of the app's navy/gold theme — the paper must read like the real
 * TOEIC test book. Navy/gold stay confined to the surrounding chrome.
 */
export function PaperCard({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto w-full max-w-[820px] min-h-[70vh] bg-white text-[#1a1a1a] border border-[#d0d0d0] px-6 py-10 sm:px-10 md:px-16 md:py-14">
      {children}
    </div>
  );
}
