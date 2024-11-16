import { FileJson, FileType2 } from 'lucide-react';
import Image from "next/image";

export function Header() {
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-neutral-950/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex items-center text-primary">
             <a href='/' className="-m-1.5 p-1.5" >
                         <Image className="h-8 w-auto" src="/appicon.svg" alt="jsonhome.com" width={32} height={32}/>
            </a>
            </div>
            <p className="text-xl font-semibold">jsoncsv</p>
          </div>
          <a
            href="https://github.com/rudy2steiner/json-to-csv"
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