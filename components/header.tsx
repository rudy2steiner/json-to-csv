import { FileJson, FileType2 } from 'lucide-react';

export function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-neutral-950/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center text-primary">
              <FileJson className="h-6 w-6" />
              <div className="mx-1 text-2xl">&rarr;</div>
              <FileType2 className="h-6 w-6" />
            </div>
            <h1 className="text-xl font-semibold">JSON to CSV Converter</h1>
          </div>
          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted-foreground hover:text-primary transition-colors"
          >
            View on GitHub
          </a>
        </div>
      </div>
    </header>
  );
}