import Link from "next/link";
import { Icon } from "./Icon";

type TestTileProps = {
  number: string;
  label: string;
  cta?: string;
} & (
  | { href: string; disabled?: false }
  | { href?: undefined; disabled: true }
);

export function TestTile(props: TestTileProps) {
  const { number, label, cta = "Begin" } = props;

  if (props.disabled) {
    return (
      <div className="flex h-24 flex-col justify-between border border-outline-variant bg-surface-container-low p-3 opacity-50">
        <div className="flex flex-col gap-0.5">
          <span className="text-mono-md font-bold text-outline">{number}</span>
          <span className="text-body-lg font-semibold text-on-surface">
            {label}
          </span>
        </div>
        <div className="text-[12px] font-bold uppercase tracking-wider text-on-surface-variant">
          Coming soon
        </div>
      </div>
    );
  }

  return (
    <Link
      href={props.href}
      className="test-tile group flex h-24 flex-col justify-between border border-outline-variant bg-surface-container-low p-3 transition-all hover:border-primary"
    >
      <div className="flex flex-col gap-0.5">
        <span className="text-mono-md font-bold text-accent-gold group-hover:text-primary transition-colors">
          {number}
        </span>
        <span className="text-body-lg font-semibold text-on-surface">
          {label}
        </span>
      </div>
      <div className="flex items-center gap-1 text-[12px] font-bold uppercase tracking-wider text-primary-container group-hover:underline">
        {cta}
        <Icon name="arrow_forward" className="text-[16px]" />
      </div>
    </Link>
  );
}
