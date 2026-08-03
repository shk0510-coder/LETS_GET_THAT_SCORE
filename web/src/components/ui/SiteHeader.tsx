import Link from "next/link";
import { Container } from "./Container";

export function SiteHeader({
  title,
  subtitle,
  href = "/",
}: {
  title: string;
  subtitle?: string;
  href?: string;
}) {
  return (
    <header className="w-full bg-surface-container-lowest border-b border-outline-variant">
      <Container className="py-4 md:py-6">
        <Link href={href} className="inline-block">
          <h1 className="text-headline-md font-bold text-primary">{title}</h1>
        </Link>
        {subtitle ? (
          <p className="text-body-sm text-on-surface-variant">{subtitle}</p>
        ) : null}
      </Container>
    </header>
  );
}
