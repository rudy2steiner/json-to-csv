import React from "react";

export function Footer() {
  return (
    <footer className="border-t bg-white/70 dark:bg-neutral-950/70 py-8 mt-12">
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center md:items-start justify-between gap-8 md:gap-4 text-center md:text-left">
        <div className="flex-1 text-sm text-muted-foreground mb-6 md:mb-0">
          &copy; {new Date().getFullYear()} JSON to CSV & CSV to JSON Converter. All rights reserved.<br />
          Free, private, and instant JSON to CSV and CSV to JSON conversion tools for everyone.
        </div>
        <div className="flex flex-col sm:flex-row gap-6 md:gap-8 items-center md:items-start w-full md:w-auto">
          <div>
            <h3 className="font-semibold mb-2 text-primary">Community</h3>
            <ul className="space-y-1">
              <li><a href="https://github.com/rudy2steiner/json-to-csv" target="_blank" rel="noopener noreferrer" className="hover:underline block py-1">GitHub</a></li>
              <li><a href="#" className="hover:underline block py-1">Twitter</a></li>
              <li><a href="#" className="hover:underline block py-1">Discord</a></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold mb-2 text-primary">Friends</h3>
            <ul className="space-y-1">
              <li><a href="#" className="hover:underline block py-1">CSV Tools</a></li>
              <li><a href="#" className="hover:underline block py-1">JSON Formatter</a></li>
              <li><a href="#" className="hover:underline block py-1">Open Source Utils</a></li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
} 