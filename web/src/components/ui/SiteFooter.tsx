import Link from "next/link";
import { Container } from "./Container";

const FOOTER_LINKS = [
  { href: "/about", label: "About" },
  { href: "/terms", label: "Terms of Service" },
  { href: "/privacy", label: "Privacy Policy" },
];

export function SiteFooter({ siteName }: { siteName: string }) {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant py-8">
      <Container className="flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-body-sm text-on-surface-variant text-center md:text-left">
          © 2026 {siteName}. All rights reserved.
        </p>
        <nav className="flex items-center gap-6">
          {FOOTER_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-body-sm text-on-surface-variant hover:text-primary transition-colors"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </Container>
    </footer>
  );
}
