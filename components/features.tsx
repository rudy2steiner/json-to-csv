import { FileJson, FileType2, Shield, Zap } from 'lucide-react';

export function Features() {
  return (
    <div>
    <div className="grid gap-6 sm:grid-cols-2">
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <Zap className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Fast Conversion</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Convert your files instantly with our efficient processing engine.
        </p>
      </div>
      
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <Shield className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">Secure & Private</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          All processing happens in your browser. No data is sent to servers.
        </p>
      </div>
      
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <FileJson className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">JSON Support</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Handle complex JSON structures with nested objects and arrays.
        </p>
      </div>
      
      <div className="rounded-lg border bg-card p-4">
        <div className="flex items-center gap-2 mb-2">
          <FileType2 className="h-5 w-5 text-primary" />
          <h3 className="font-semibold">CSV Preview</h3>
        </div>
        <p className="text-sm text-muted-foreground">
          Preview your converted data in a table format before downloading.
        </p>
      </div>
    </div>
    </div>
  );
}