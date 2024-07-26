import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import { Toaster } from "@/components/ui/toaster";
import { cn } from "@/lib/utils";
import AuthProvider from "@/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "وکیل تو ",
  description: "مستندات حقوقی خود را با وکیل تو تنظیم کنید",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" dir="rtl">
      <body
        className={cn(
          "min-h-screen font-sans antialiased grainy ",
          inter.className
        )}
      >
        <AuthProvider>
          <Toaster />
          <Navbar />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
