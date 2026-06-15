import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { cn } from "@/lib/utils";
import { AppShell } from "@/components/layout/app-shell";
import { ThemeProvider } from "@/providers/theme-provider";
import { AnalysisProvider } from "@/providers/analysis-provider";
import { WalletProvider } from "@/providers/wallet-provider";
import { Toaster } from "@/components/ui/sonner";
import { ApiStatusChecker } from "@/components/shared/api-status-checker";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "MantleGuard - Smart Contract Security Platform",
  description: "Comprehensive security auditing and gas optimization for Mantle Network smart contracts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans dark", geistSans.variable)} suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <WalletProvider>
            <AnalysisProvider>
              <ApiStatusChecker />
              <AppShell>
                {children}
              </AppShell>
              <Toaster />
            </AnalysisProvider>
          </WalletProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
