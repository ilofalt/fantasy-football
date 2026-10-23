import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import InitColorSchemeScript from "@mui/material/InitColorSchemeScript";
import ThemeRegistry from "@/components/ThemeRegistry";
import "./globals.css";

const roboto = Roboto({
  subsets: ["latin"],
  weight: ["300", "400", "500", "700"],
  variable: "--font-roboto",
});

const title = "Fantasy Football — Isaiah Ofalt";
const description = "Fantasy football league hub by Isaiah Ofalt.";

export const metadata: Metadata = {
  metadataBase: new URL("https://ff.isaiahofalt.com"),
  title,
  description,
  openGraph: {
    title,
    description,
    url: "https://ff.isaiahofalt.com",
    siteName: "Fantasy Football",
    type: "website",
    // Explicit preview image so link unfurlers don't pick a photo off the page.
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: "Fantasy Football" }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: ["/og-image.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={roboto.variable} suppressHydrationWarning>
      <body>
        <InitColorSchemeScript />
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
