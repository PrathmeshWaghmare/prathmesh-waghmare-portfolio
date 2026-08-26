import type { Metadata, Viewport } from "next";
import "@fontsource/inter/400.css";
import "@fontsource/inter/500.css";
import "@fontsource/inter/600.css";
import "@fontsource/inter/700.css";
import "@fontsource/space-grotesk/500.css";
import "@fontsource/space-grotesk/600.css";
import "@fontsource/space-grotesk/700.css";
import "@fontsource/jetbrains-mono/400.css";
import "@fontsource/jetbrains-mono/500.css";
import "./globals.css";
import { ThemeProvider } from "@/components/layout/ThemeProvider";
import SmoothScrollProvider from "@/components/layout/SmoothScrollProvider";
import CommandPalette from "@/components/layout/CommandPalette";
import RegisterSW from "@/components/layout/RegisterSW";
import { getProfile, getSocials } from "@/lib/content";

const SITE_URL = "https://prathmeshwaghmare.dev";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Prathmesh Waghmare — AI/ML Engineer & Computer Vision Researcher",
    template: "%s · Prathmesh Waghmare",
  },
  description:
    "Portfolio of Prathmesh Waghmare — AI/ML Engineer and Computer Vision Researcher building satellite-imagery detection systems as a Research Intern at ISRO's Space Applications Centre. Author of IEEE-indexed publications in computer vision and healthcare AI.",
  keywords: [
    "Prathmesh Waghmare",
    "AI Engineer",
    "Machine Learning Engineer",
    "Computer Vision Researcher",
    "ISRO Intern",
    "Space Applications Centre",
    "YOLO Object Detection",
    "Satellite Image Processing",
    "Full Stack Developer",
    "DMIHER",
  ],
  authors: [{ name: "Prathmesh Waghmare", url: SITE_URL }],
  creator: "Prathmesh Waghmare",
  openGraph: {
    type: "website",
    url: SITE_URL,
    title: "Prathmesh Waghmare — AI/ML Engineer & Computer Vision Researcher",
    description:
      "Building AI-powered systems for computer vision, satellite imagery, and healthcare — from ISRO research labs to production web apps.",
    siteName: "Prathmesh Waghmare",
    images: [{ url: "/images/og-image.svg", width: 1200, height: 630, alt: "Prathmesh Waghmare portfolio" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prathmesh Waghmare — AI/ML Engineer & Computer Vision Researcher",
    description:
      "Building AI-powered systems for computer vision, satellite imagery, and healthcare — from ISRO research labs to production web apps.",
    images: ["/images/og-image.svg"],
  },
  robots: { index: true, follow: true },
  icons: {
    icon: "/favicon.svg",
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  },
  manifest: "/manifest.json",
};

export const viewport: Viewport = {
  themeColor: "#030712",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const profile = getProfile();
  const socials = getSocials();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Person",
    name: profile.name,
    jobTitle: profile.title,
    description: profile.shortBio,
    email: `mailto:${profile.email}`,
    address: { "@type": "PostalAddress", addressLocality: profile.location },
    url: SITE_URL,
    sameAs: [socials.github, socials.linkedin, socials.googleScholar].filter(Boolean),
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: profile.education.institution,
    },
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="antialiased">
        <ThemeProvider>
          <SmoothScrollProvider>
            <a
              href="#main-content"
              className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:rounded-md focus:bg-[var(--color-primary)] focus:px-4 focus:py-2 focus:text-white"
            >
              Skip to content
            </a>
            {children}
            <CommandPalette />
            <RegisterSW />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
