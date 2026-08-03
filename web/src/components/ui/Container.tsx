import { ReactNode } from "react";

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`w-full max-w-5xl mx-auto px-4 md:px-10 ${className}`}>
      {children}
    </div>
  );
}
