import { Fragment } from "react";

/**
 * Renders passage text as-is, except when `blankIds` is given: any "(131)"
 * style marker whose number is in that set becomes a short gold underline
 * with a small superscript number, instead of a bare parenthesized digit.
 * Only Part 6 passages pass `blankIds` — everywhere else this is a no-op.
 */
export function PassageBody({
  text,
  blankIds,
  className = "",
}: {
  text: string;
  blankIds?: number[];
  className?: string;
}) {
  if (!blankIds || blankIds.length === 0) {
    return <div className={className}>{text}</div>;
  }

  const blankSet = new Set(blankIds);
  const parts = text.split(/(\(\d+\))/g);

  return (
    <div className={className}>
      {parts.map((part, i) => {
        const match = part.match(/^\((\d+)\)$/);
        const num = match ? Number(match[1]) : null;
        if (num !== null && blankSet.has(num)) {
          return <PassageBlank key={i} number={num} />;
        }
        return <Fragment key={i}>{part}</Fragment>;
      })}
    </div>
  );
}

function PassageBlank({ number }: { number: number }) {
  return (
    <span className="group relative inline-flex items-baseline mx-0.5">
      <span className="inline-block w-14 border-b-2 border-gold transition-colors group-hover:border-[#8a6a08]" />
      <sup className="ml-0.5 inline-block text-[9px] font-bold leading-none text-gold transition-all group-hover:scale-110 group-hover:text-[#8a6a08]">
        {number}
      </sup>
    </span>
  );
}
