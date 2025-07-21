import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/theme-provider';
import { Toaster } from '@/components/ui/toaster';
import './globals.css';
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'JSON To CSV Converter Free Online Tool | jsontocsv.co',
  description: 'Convert JSON to CSV and CSV to JSON online. Free, fast, and secure file conversion tool with preview and download options.',
  keywords: 'JSON to CSV, CSV to JSON, file converter, data conversion, online tool',
  openGraph: {
    title: 'JSON-CSV Converter | Free Online Tool',
    description: 'Convert JSON to CSV and CSV to JSON online. Free, fast, and secure file conversion tool with preview and download options.',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
          <Toaster />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}