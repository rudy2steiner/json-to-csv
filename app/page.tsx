import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { JsonToCsvConverter } from '@/components/json-to-csv';
import { CsvToJsonConverter } from '@/components/csv-to-json';
import { Header } from '@/components/header';
import { Features } from '@/components/features';

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <Tabs defaultValue="json-to-csv" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="json-to-csv">JSON to CSV</TabsTrigger>
              <TabsTrigger value="csv-to-json">CSV to JSON</TabsTrigger>
            </TabsList>
            <TabsContent value="json-to-csv">
              <JsonToCsvConverter />
            </TabsContent>
            <TabsContent value="csv-to-json">
              <CsvToJsonConverter />
            </TabsContent>
          </Tabs>
          <Features />
        </div>
      </div>
    </main>
  );
}