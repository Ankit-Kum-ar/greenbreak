import type { Metadata } from "next";
import { Space_Grotesk } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  title: "GreenBreak — Touch Grass AI for Screen-Bound Developers",
  description: "The 30-Second Outdoor Dispatcher for Screen-Bound Developers",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={spaceGrotesk.variable}>
      <body className="min-h-screen bg-[#FFFFFF] text-[#191A23] font-sans antialiased selection:bg-[#B9FF66] selection:text-[#191A23]">
        <TooltipProvider>{children}</TooltipProvider>
      </body>
    </html>
  );
}
