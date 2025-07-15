import Footer from "@/components/shared/footer";
import Header from "@/components/shared/header";
import React from "react";
import { Toaster } from "sonner";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen flex-col">
      <Header />
      <main className="flex-1 wrapper">{children}</main>
      <Toaster />
      <Footer />
    </div>
  );
}
