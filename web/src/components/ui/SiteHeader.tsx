import Link from "next/link";
import { Container } from "./Container";
import { BackLink } from "./BackLink";

export function SiteHeader({
  title,
  subtitle,
  href = "/",
  backHref,
  backLabel = "Exam Select",
}: {
  title: string;
  subtitle?: string;
  href?: string;
  backHref?: string;
  backLabel?: string;
}) {
  return (
    <header className="w-full bg-surface-container-lowest border-b border-outline-variant">
      <Container className="py-4 md:py-6">
        {backHref ? (
          <div className="mb-3">
            <BackLink href={backHref} label={backLabel} />
          </div>
        ) : null}
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
