import { Metadata } from 'next';
import { Suspense } from 'react';
import { ExampleList } from '@/components/photo-maker/ExampleList';
import { unstable_setRequestLocale } from 'next-intl/server';
import { CsvToJsonConverter } from '@/components/csv-to-json';
export const metadata: Metadata = {
  title: 'Gallery | PhotoMaker',
  description: 'Explore AI-generated photo transformations and examples',
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