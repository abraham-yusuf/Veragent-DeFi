import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Veragent DeFi Agent Hub",
  description: "Deploy and manage AI agents for DeFi on Base",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
