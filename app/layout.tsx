// app/layout.tsx
import { ThemeProvider } from "@/components/theme-provider";
import { GraphProvider } from "@/hooks";
import { mockData } from "@/lib/mocks/songs"; // Import mockData
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import Header from "@/components/header";

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
  title: "SONGZ - PA - 2024.2",
  description: "Projeto da disciplina de Projeto de Algoritmos - 2024.2",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        <Header />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <main className="py-20">
            <GraphProvider graph={mockData}>{children}</GraphProvider>
          </main>
        </ThemeProvider>
      </body>
    </html>
  );
}
