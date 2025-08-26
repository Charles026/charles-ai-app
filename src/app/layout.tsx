import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
/* Removed legacy styles that used Tailwind @apply to avoid build errors on Netlify */
import ScrollIndicator from "../components/ScrollIndicator";


const inter = Inter({
  subsets: ["latin"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#000000",
};

export const metadata: Metadata = {
  title: "Charles - UI/UX Designer Portfolio",
  description: "Charles - UI/UX Designer Portfolio",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
      </head>
      <body className={`${inter.className} antialiased`} suppressHydrationWarning>
        <ScrollIndicator />
        <main>
          {children}
        </main>
      </body>
    </html>
  );
}
