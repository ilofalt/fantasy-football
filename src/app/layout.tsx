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
