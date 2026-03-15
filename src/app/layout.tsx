import type { Metadata } from "next";
import { Inter, DM_Serif_Display } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { ConditionalLayout } from "@/components/layout/ConditionalLayout";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const dmSerif = DM_Serif_Display({
  variable: "--font-dm-serif",
  subsets: ["latin"],
  weight: "400",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Lifeway Group Real Estate",
  description: "A trusted leader in the sale and leasing of affordable residential properties across Delhi NCR.",
  keywords: "real estate company in Noida, affordable property in Noida, property in Delhi NCR, real estate consultant in Noida",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} ${dmSerif.variable} antialiased`}
      >
        <ConditionalLayout>{children}</ConditionalLayout>
        <Script
          id="local-schema"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "RealEstateAgent",
              "name": "Lifeway Group Real Estate",
              "image": "https://lifewayinfra.in/Logo_with_text_transparent_bg.png",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "613A, 6th Floor, Block-C, KLJ Noida One, Sector-62",
                "addressLocality": "Noida",
                "addressRegion": "UP",
                "postalCode": "201309",
                "addressCountry": "IN"
              },
              "telephone": "+91 98765 43210",
              "email": "info@lifewayinfra.in",
              "url": "https://www.lifewayinfra.in"
            })
          }}
        />
      </body>
    </html>
  );
}
