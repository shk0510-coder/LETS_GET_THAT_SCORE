import Link from "next/link";
import { Badge, Container, Icon, SiteFooter } from "@/components/ui";

const FEATURES = [
  {
    title: "Authentic ETS Format",
    description:
      "Every module is calibrated to match official test center conditions and timing.",
  },
  {
    title: "Instant Scoring",
    description:
      "Receive immediate feedback on multiple-choice sections to track your progress.",
  },
  {
    title: "Free Practice Tests",
    description:
      "Access high-quality study materials at no cost, designed by language experts.",
  },
];

export default function GatewayPage() {
  return (
    <div className="flex flex-col flex-1">
      <header className="w-full sticky top-0 z-50 bg-surface border-b border-outline-variant">
        <Container className="h-16 flex items-center justify-between">
          <span className="text-headline-md font-bold text-primary">
            Let&apos;s get that Score
          </span>
        </Container>
      </header>

      <main className="flex-grow">
        <section className="bg-surface-container-low py-16 md:py-24">
          <Container className="text-center">
            <div className="max-w-2xl mx-auto mb-12">
              <Badge>Free • ETS-format practice</Badge>
              <h1 className="text-headline-lg-mobile md:text-headline-xl text-primary mt-6 mb-4">
                Choose your exam
              </h1>
              <p className="text-body-lg text-on-surface-variant">
                Professional, authentic practice for your next milestone.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left max-w-3xl mx-auto">
              <Link
                href="/toefl"
                className="group flex flex-col justify-between border border-outline-variant bg-surface-container-lowest p-10 transition-colors hover:border-primary-container"
              >
                <div>
                  <span className="text-label-md text-primary-container mb-4 block uppercase tracking-widest">
                    TOEFL Prep
                  </span>
                  <h2 className="text-headline-md text-primary mb-4">
                    Let&apos;s get that 120
                  </h2>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    Master the TOEFL with ETS-authentic reading, listening,
                    speaking, and writing modules.
                  </p>
                </div>
                <div className="mt-8 flex items-center text-primary text-label-md">
                  <span>Get Started</span>
                  <Icon
                    name="arrow_forward"
                    className="ml-2 text-accent-gold group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>

              <Link
                href="/toeic"
                className="group flex flex-col justify-between border border-outline-variant bg-surface-container-lowest p-10 transition-colors hover:border-primary-container"
              >
                <div>
                  <span className="text-label-md text-primary-container mb-4 block uppercase tracking-widest">
                    TOEIC Prep
                  </span>
                  <h2 className="text-headline-md text-primary mb-4">
                    Let&apos;s get that 990
                  </h2>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    Prepare for the TOEIC with realistic business-context
                    questions and official timing.
                  </p>
                </div>
                <div className="mt-8 flex items-center text-primary text-label-md">
                  <span>Get Started</span>
                  <Icon
                    name="arrow_forward"
                    className="ml-2 text-accent-gold group-hover:translate-x-1 transition-transform"
                  />
                </div>
              </Link>
            </div>
          </Container>
        </section>

        <div className="h-px bg-outline-variant max-w-5xl mx-auto" />

        <section className="py-16 bg-surface-container-lowest">
          <Container>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
              {FEATURES.map((feature) => (
                <div key={feature.title} className="flex flex-col gap-4">
                  <h3 className="text-label-md text-primary uppercase tracking-wider">
                    {feature.title}
                  </h3>
                  <p className="text-body-md text-on-surface-variant leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </Container>
        </section>
      </main>

      <SiteFooter siteName="Let's get that Score" />
    </div>
  );
}
