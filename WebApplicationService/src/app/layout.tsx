import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/components/AuthProvider";
import NavBar from "@/components/NavBar";

export const metadata: Metadata = {
  title: "Cycle Store Web",
  description: "Modern web application for the cycle store system",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <a href="#main" className="skip">
          Skip to content
        </a>
        <AuthProvider>
          <NavBar />
          <main id="main" className="min-h-screen">
            {children}
          </main>
        </AuthProvider>
      </body>
    </html>
  );
}
