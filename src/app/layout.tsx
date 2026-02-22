import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import ConditionalLayout from "@/components/layout/ConditionalLayout";
import { Providers } from "@/app/Providers";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    default: "HR Real Estate | DHA Lahore Specialist Since 2004",
    template: "%s | HR Real Estate",
  },
  description:
    "20+ years of trusted DHA real estate expertise in Lahore. Buy, sell, and rent premium residential and commercial properties across all DHA phases with complete confidence.",
  keywords: [
    "DHA Lahore",
    "DHA real estate",
    "HR Real Estate",
    "property for sale DHA",
    "DHA Phase 1",
    "DHA Phase 2",
    "DHA Phase 3",
    "DHA Phase 4",
    "DHA Phase 5",
    "DHA Phase 6",
    "buy house DHA Lahore",
    "rent property DHA",
    "plot for sale DHA",
    "commercial property DHA",
    "real estate agent Lahore",
    "property dealer DHA",
    "Lahore property",
  ],
  authors: [{ name: "HR Real Estate" }],
  creator: "HR Real Estate",
  publisher: "HR Real Estate",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "HR Real Estate",
    title: "HR Real Estate | DHA Lahore Specialist Since 2004",
    description:
      "20+ years of trusted DHA real estate expertise in Lahore. Buy, sell, and rent premium properties across all DHA phases.",
    images: [
      {
        url: "/icon.svg",
        width: 512,
        height: 512,
        alt: "HR Real Estate",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "HR Real Estate | DHA Lahore Specialist Since 2004",
    description:
      "20+ years of trusted DHA real estate expertise in Lahore. Buy, sell, and rent premium properties across all DHA phases.",
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon.svg",
  },
  metadataBase: new URL(
    process.env.NEXTAUTH_URL || "http://localhost:3000"
  ),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <ConditionalLayout>{children}</ConditionalLayout>
        </Providers>
      </body>
    </html>
  );
}
