import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Let's Get That Score",
  description: "TOEFL & TOEIC practice, built like the real exam.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-on-surface">
        {/* eslint-disable-next-line @next/next/no-page-custom-font -- root layout applies to every route in the App Router, so this is not the single-page pitfall the rule warns about */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
          precedence="default"
        />
        {children}
      </body>
    </html>
  );
}
