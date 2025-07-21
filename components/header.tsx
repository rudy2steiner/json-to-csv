import { FileJson, FileType2 } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export function Header() {
  const pathname = typeof window !== "undefined" ? window.location.pathname : "";
  return (
    <header className="border-b bg-white/50 backdrop-blur-sm dark:bg-neutral-950/50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center text-primary gap-2">
            <a href='/' className="-m-1.5 p-1.5" >
              <Image className="h-8 w-auto" src="/appicon.svg" alt="jsonhome.com" width={32} height={32}/>
            </a>
            <span className="text-xl font-semibold ml-2">JSON To CSV </span>
          </div>
          <nav className="flex-1 flex justify-center gap-2">
            <Link href="/json-to-csv" passHref legacyBehavior>
              <a className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                ${pathname === "/json-to-csv" || pathname === "/" 
                  ? "bg-primary text-primary-foreground shadow border border-primary/70 ring-2 ring-primary/20" 
                  : "text-muted-foreground hover:text-primary hover:bg-accent/50"}
              `}>JSON to CSV</a>
            </Link>
            <Link href="/csv-to-json" passHref legacyBehavior>
              <a className={`px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200
                ${pathname === "/csv-to-json" 
                  ? "bg-primary text-primary-foreground shadow border border-primary/70 ring-2 ring-primary/20" 
                  : "text-muted-foreground hover:text-primary hover:bg-accent/50"}
              `}>CSV to JSON</a>
            </Link>
          </nav>
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