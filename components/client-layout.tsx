"use client";

import React from "react";
import Link from "next/link";
import { ThemeProvider } from "next-themes";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="dark"
      enableSystem
      disableTransitionOnChange
    >
      <div className="flex flex-col min-h-screen">
        
        <main className="flex-1">
          {children}
        </main>
      </div>
    </ThemeProvider>
  );
} 