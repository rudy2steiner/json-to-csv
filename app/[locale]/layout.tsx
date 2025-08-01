import { Inter } from 'next/font/google';
import { unstable_setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Toaster } from '@/components/ui/toaster';
import { Navigation } from '@/components/sections/Navigation';
import { Footer } from '@/components/sections/Footer';
import { I18nProvider } from '@/app/i18n/provider';
import { locales, isValidLocale } from '@/app/i18n/config';
import { Metadata } from 'next';
import '../globals.css';
import { Analytics } from "@vercel/analytics/react";

const inter = Inter({ subsets: ['latin'] });

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export const metadata: Metadata = {
  metadataBase: new URL('https://www.read-to-me.org'),
  title: {
    default: 'PhotoMaker - AI Photo Maker',
    template: '%s'
  },
  robots: {
    index: true,
    follow: true
  }
};

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!isValidLocale(locale)) {
    notFound();
  }

  unstable_setRequestLocale(locale);

  let messages;
  try {
    messages = (await import(`@/messages/${locale}.json`)).default;
  } catch (error) {
    notFound();
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
            <script defer data-domain="jsontocsv.co" src="https://app.pageview.app/js/script.js"></script>
       </head>
      <body className={inter.className}>
        <I18nProvider locale={locale} messages={messages} timeZone="UTC">
          <div className="min-h-screen flex flex-col">
            <Navigation />
            <main className="flex-grow">
              {children}
            </main>
            <Footer />
          </div>
          <Toaster />
        </I18nProvider>
        <Analytics />
      </body>
    </html>
  );
}