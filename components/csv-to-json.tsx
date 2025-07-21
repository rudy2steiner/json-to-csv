"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Download, FileType2, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';

export function CsvToJsonConverter() {
  const [csvContent, setCsvContent] = useState<string>('');
  const [jsonContent, setJsonContent] = useState<string>('');
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          setCsvContent(text);
          setJsonContent('');
        } catch (error) {
          toast({
            title: "Error reading file",
            description: "Please make sure the file is a valid CSV.",
            variant: "destructive"
          });
        }
      };
      reader.readAsText(file);
    }
  }, [toast]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'text/csv': ['.csv']
    },
    multiple: false
  });

  const handleCsvInput = (value: string) => {
    setCsvContent(value);
    setJsonContent('');
  };

  const convertToJSON = () => {
    try {
      const lines = csvContent.split('\n').filter(line => line.trim());
      if (lines.length < 2) {
        throw new Error('CSV must have headers and at least one data row');
      }

      const headers = lines[0].split(',').map(header => 
        header.trim().replace(/^["'](.+)["']$/, '$1')
      );
      
      const jsonArray = lines.slice(1).map(line => {
        const values = line.split(',').map(value => 
          value.trim().replace(/^["'](.+)["']$/, '$1')
        );
        
        const obj: Record<string, string> = {};
        headers.forEach((header, index) => {
          obj[header] = values[index] || '';
        });
        
        return obj;
      });

      setJsonContent(JSON.stringify(jsonArray, null, 2));
      
      toast({
        title: "Conversion successful",
        description: "Your CSV has been converted to JSON format."
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: error instanceof Error ? error.message : "Invalid CSV format",
        variant: "destructive"
      });
    }
  };

  const downloadJSON = () => {
    const blob = new Blob([jsonContent], { type: 'application/json' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-6">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-muted-foreground/25 hover:border-primary/50"
        )}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2">
          <Upload className="h-8 w-8 text-muted-foreground" />
          <div className="text-lg font-medium">
            {isDragActive ? (
              "Drop your CSV file here"
            ) : (
              "Drag & drop your CSV file here, or click to select"
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Supports single CSV file up to 10MB
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <div className="flex items-center gap-2">
              <FileType2 className="h-4 w-4" />
              <p className="font-medium">CSV Input</p>
            </div>
            <Button onClick={convertToJSON} size="sm">
              Convert to JSON
            </Button>
          </div>
          <div className="p-4">
            <Textarea
              value={csvContent}
              onChange={(e) => handleCsvInput(e.target.value)}
              placeholder="Paste your CSV data here..."
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
        </div>

        {jsonContent && (
          <div className="rounded-lg border bg-card">
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <div className="flex items-center gap-2">
                <FileType2 className="h-4 w-4" />
                <h3 className="font-medium">JSON Preview</h3>
              </div>
              <Button onClick={downloadJSON} size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download JSON
              </Button>
            </div>
            <div className="p-4">
              <Textarea
                value={jsonContent}
                readOnly
                className="min-h-[200px] font-mono text-sm"
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
}