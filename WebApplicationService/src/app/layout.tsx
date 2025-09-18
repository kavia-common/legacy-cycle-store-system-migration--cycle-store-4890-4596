import type { Metadata } from "next";
import "./globals.css";
import { AuthProvider } from "@/lib/auth-context";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Cycle Store Web App",
  description: "Modern, accessible UI for Cycle Store roles with RBAC and training/docs.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning className="min-h-screen flex flex-col">
        <AuthProvider>
          <a href="#main" className="visually-hidden">Skip to content</a>
          <Header />
          <main id="main" className="flex-1">
            {children}
          </main>
          <Footer />
        </AuthProvider>
      </body>
    </html>
  );
}
