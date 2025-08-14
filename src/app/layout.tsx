import type { Metadata } from "next";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/theme-provider";
import Providers from "./provider";
import { Toaster } from "react-hot-toast";
import { Comic_Neue } from "next/font/google";

// Define the font without exporting it
const comicNeue = Comic_Neue({
  variable: "--font-comic-neue",
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: {
    default: "ByteLog",
    template: "%s - ByteLog",
  },
  description: "Your instant byte-sized blogging",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${comicNeue.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <Providers>{children}</Providers>
          <Toaster
            position="bottom-right"
            reverseOrder={false}
            toastOptions={{
              duration: 1500,
              style: {
                padding: "10px",
              },
            }}
          />
        </ThemeProvider>
      </body>
    </html>
  );
}