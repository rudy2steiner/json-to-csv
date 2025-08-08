import { Metadata } from 'next';
import { Suspense } from 'react';
import { ExampleList } from '@/components/photo-maker/ExampleList';
import { unstable_setRequestLocale } from 'next-intl/server';
import { CsvToJsonConverter } from '@/components/csv-to-json';
export const metadata: Metadata = {
  title: 'CSV To JSON Converter Free Online | jsontocsv.co',
  description: 'Convert JSON to CSV and CSV to JSON online. Free, fast, and secure csv converter with preview and download options.',
};

interface Props {
  params: { locale: string };
}

export default function GalleryPage({ params: { locale } }: Props) {
  unstable_setRequestLocale(locale);

  return (
    <main className="container mx-auto py-12">
       <CsvToJsonConverter />
    </main>
  );
}