import { Container } from "./Container";

export function SiteFooter({ siteName }: { siteName: string }) {
  return (
    <footer className="w-full bg-surface-container-lowest border-t border-outline-variant py-8">
      <Container>
        <p className="text-body-sm text-on-surface-variant text-center md:text-left">
          © 2026 {siteName}. All rights reserved.
        </p>
      </Container>
    </footer>
  );
}
