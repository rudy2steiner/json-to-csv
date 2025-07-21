import { Header } from '@/components/header';
import { JsonToCsvConverter } from '@/components/json-to-csv';
import { Features } from '@/components/features';
import { Footer } from '@/components/footer';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';

const testimonials = [
  {
    name: "Alice W.",
    feedback: "The JSON to CSV tool is fast, accurate, and super easy to use. It saved me hours of manual work! Highly recommended for anyone needing JSON to CSV conversion.",
    color: "bg-blue-400",
  },
  {
    name: "Devon L.",
    feedback: "I love how secure and private this JSON to CSV converter is. Everything happens in my browser, and the CSV output is perfect every time.",
    color: "bg-green-400",
  },
  {
    name: "Priya S.",
    feedback: "Best free JSON to CSV converter online! The preview and download options are a game changer for my workflow.",
    color: "bg-pink-400",
  },
];

const faqs = [
  {
    q: "What is a JSON to CSV converter?",
    a: "A JSON to CSV converter is a tool that transforms JSON data into CSV format, making it easier to work with in spreadsheets and databases.",
  },
  {
    q: "Is my data safe when using this JSON to CSV tool?",
    a: "Yes! All conversions happen locally in your browser. Your JSON data never leaves your device.",
  },
  {
    q: "Can I convert large JSON files to CSV?",
    a: "Our JSON to CSV converter supports files up to 10MB, making it suitable for most use cases.",
  },
  {
    q: "Does the JSON to CSV converter handle nested JSON?",
    a: "Yes, our tool is designed to handle complex JSON structures, including nested objects and arrays, for accurate CSV output.",
  },
];

export default function JsonToCsvPage() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-neutral-50 to-neutral-100 dark:from-neutral-950 dark:to-neutral-900">
      <Header />
      <div className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-12 mb-8">
          <h1 className="text-4xl font-bold mb-4">Free Online JSON to CSV Converter</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-6">
            Instantly convert your JSON to CSV with our fast, secure, and user-friendly JSON to CSV tool. No sign-up, no data upload—just pure JSON to CSV conversion in your browser.
          </p>
          <a href="#converter" className="inline-block bg-primary text-primary-foreground px-6 py-3 rounded-md font-semibold shadow hover:bg-primary/90 transition">Start Converting JSON to CSV</a>
        </section>
        {/* Converter Section */}
        <section className="py-10 mb-8" id="converter">
          <JsonToCsvConverter />
        </section>

        {/* Why Choose Our JSON to CSV Converter */}
        <section className="py-10 mb-8" id="why-choose-json-to-csv">
          <h2 className="text-2xl font-semibold mb-4 text-center">Why Choose Our JSON to CSV Converter?</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-card rounded-lg p-6 shadow">
              <h3 className="font-bold mb-2">100% Privacy</h3>
              <p>Your JSON to CSV conversion happens entirely in your browser. No uploads, no risk—your data stays safe.</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow">
              <h3 className="font-bold mb-2">Lightning Fast</h3>
              <p>Convert JSON to CSV in seconds, even for large files. Our JSON to CSV tool is optimized for speed and reliability.</p>
            </div>
            <div className="bg-card rounded-lg p-6 shadow">
              <h3 className="font-bold mb-2">Free & Unlimited</h3>
              <p>Use our JSON to CSV converter as much as you want—no limits, no fees, just easy JSON to CSV conversion.</p>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-10 mb-8" id="features-json-to-csv">
          <h2 className="text-2xl font-semibold mb-4 text-center">JSON to CSV Converter Features</h2>
          <Features />
        </section>

        {/* How It Works Section */}
        <section className="py-10 mb-8" id="how-json-to-csv-works">
          <h2 className="text-2xl font-semibold mb-4 text-center">How to Use the JSON to CSV Converter</h2>
          <ol className="max-w-2xl mx-auto list-decimal list-inside space-y-2 text-lg">
            <li>Paste your JSON data or upload a .json file into the JSON to CSV converter below.</li>
            <li>Click <span className="font-semibold">Convert to CSV</span> to instantly transform your JSON to CSV.</li>
            <li>Preview your CSV output and download the file for use in Excel, Google Sheets, or databases.</li>
          </ol>
        </section>

        
        {/* What Users Say Section */}
        <section className="py-10 mb-8 bg-muted rounded-lg" id="json-to-csv-testimonials">
          <h2 className="text-2xl font-semibold mb-4 text-center">What Users Say About Our JSON to CSV Converter</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {testimonials.map((t, i) => (
              <div key={i} className="bg-card rounded-lg p-6 shadow text-left flex flex-col h-full">
                <p className="mb-4 text-muted-foreground flex-1">“{t.feedback}”</p>
                <div className="flex items-center gap-3 mt-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg ${t.color}`}>
                    {t.name.split(' ').map(n => n[0]).join('').toUpperCase()}
                  </div>
                  <div className="font-semibold">{t.name}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-10 mb-8" id="json-to-csv-faqs">
          <h2 className="text-2xl font-semibold mb-4 text-center">JSON to CSV Converter FAQs</h2>
          <div className="max-w-2xl mx-auto">
            <Accordion type="multiple" defaultValue={faqs.map((_, i) => `faq-${i}`)} className="space-y-2">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="justify-start text-left">
                    <span className="font-semibold mr-2">{i + 1}.</span> {faq.q}
                  </AccordionTrigger>
                  <AccordionContent>
                    {faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>
      </div>
      <Footer />
    </main>
  );
} 