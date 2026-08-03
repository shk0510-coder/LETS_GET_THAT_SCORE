import { ReactNode } from "react";

export function Badge({ children }: { children: ReactNode }) {
  return (
    <span className="inline-block rounded-full border border-gold/30 bg-gold-container px-4 py-1 text-label-md uppercase tracking-wider text-on-gold-container">
      {children}
    </span>
  );
}
