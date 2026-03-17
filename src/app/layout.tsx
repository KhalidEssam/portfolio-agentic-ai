import type { Metadata } from "next";
import "./globals.css";
import profileData from "@/data/profileData.json";

export const metadata: Metadata = {
  title: `${profileData.personal.name} | ${profileData.personal.title}`,
  description: profileData.personal.summary,
  keywords: Object.values(profileData.skills).flat().join(", "),
  openGraph: {
    title: `${profileData.personal.name} | ${profileData.personal.title}`,
    description: profileData.personal.summary,
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans">{children}</body>
    </html>
  );
}
