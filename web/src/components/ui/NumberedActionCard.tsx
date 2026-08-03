import Link from "next/link";
import { Icon } from "./Icon";

export function NumberedActionCard({
  number,
  title,
  description,
  cta,
  href,
}: {
  number: string;
  title: string;
  description: string;
  cta: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group flex flex-col items-start text-left border border-outline-variant bg-surface-container-low p-10 transition-all duration-200 hover:border-primary-container focus:outline-none focus:ring-2 focus:ring-primary-container active:scale-[0.98]"
    >
      <span className="text-accent-gold font-bold text-4xl mb-4">
        {number}
      </span>
      <h2 className="text-headline-md text-primary mb-2">{title}</h2>
      <p className="text-body-md text-on-secondary-container grow">
        {description}
      </p>
      <div className="mt-8 flex items-center text-primary font-bold text-sm group-hover:translate-x-1 transition-transform">
        <span className="mr-2">{cta}</span>
        <Icon name="arrow_forward" className="text-sm" />
      </div>
    </Link>
  );
}
