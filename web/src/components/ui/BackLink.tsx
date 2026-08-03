import Link from "next/link";
import { Icon } from "./Icon";

export function BackLink({ href, label }: { href: string; label: string }) {
  return (
    <Link
      href={href}
      className="inline-flex items-center gap-2 text-label-md uppercase text-on-surface-variant hover:text-primary transition-colors"
    >
      <Icon name="arrow_back" className="text-[18px]" />
      <span>{label}</span>
    </Link>
  );
}
