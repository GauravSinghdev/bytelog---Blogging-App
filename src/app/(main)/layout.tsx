import { Comfortaa } from "next/font/google";
import Appbar from "@/components/shared/Appbar";
import Footer from "@/components/shared/Footer";

const comfortaa = Comfortaa({
  variable: "--font-comfortaa",
  subsets: ["latin"],
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="space-y-1 tracking-wider">
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 dark:from-slate-900 dark:via-slate-950 dark:to-slate-900 relative overflow-hidden">
        {/* Background Grid */}
        <div className="absolute inset-0 bg-grid-slate-200/60 [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)] pointer-events-none" />
        <Appbar />
        {children}
      </div>
      <Footer />
    </div>
  );
}
