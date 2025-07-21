import { Header } from '@/components/header';
import { CsvToJsonConverter } from '@/components/csv-to-json';
import { Features } from '@/components/features';
import { Footer } from '@/components/footer';

export default function CsvToJsonPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-6xl mx-auto space-y-8">
          <CsvToJsonConverter />
          <Features />
        </div>
      </div>
      <Footer />
    </main>
  );
} 