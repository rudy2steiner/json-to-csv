"use client";

import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { Download, FileJson, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/components/ui/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { cn } from '@/lib/utils';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export function JsonToCsvConverter() {
  const [jsonContent, setJsonContent] = useState<string>('');
  const [csvContent, setCsvContent] = useState<string>('');
  const [tableData, setTableData] = useState<{ headers: string[]; rows: any[] }>({ headers: [], rows: [] });
  const { toast } = useToast();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target?.result as string;
          const json = JSON.parse(text);
          setJsonContent(JSON.stringify(json, null, 2));
          setCsvContent('');
          setTableData({ headers: [], rows: [] });
        } catch (error) {
          toast({
            title: "Error reading file",
            description: "Please make sure the file contains valid JSON.",
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
      'application/json': ['.json']
    },
    multiple: false
  });

  const handleJsonInput = (value: string) => {
    setJsonContent(value);
    setCsvContent('');
    setTableData({ headers: [], rows: [] });
  };

  const convertToCSV = () => {
    try {
      const json = JSON.parse(jsonContent);
      
      if (!Array.isArray(json)) {
        throw new Error('JSON must be an array of objects');
      }
      
      if (json.length === 0) {
        throw new Error('JSON array is empty');
      }

      const headers = Object.keys(json[0]);
      const csvRows = [headers.join(',')];

      for (const row of json) {
        const values = headers.map(header => {
          const val = row[header];
          return typeof val === 'string' ? `"${val.replace(/"/g, '""')}"` : val;
        });
        csvRows.push(values.join(','));
      }

      setCsvContent(csvRows.join('\n'));
      setTableData({ headers, rows: json });
      
      toast({
        title: "Conversion successful",
        description: "Your JSON has been converted to CSV format."
      });
    } catch (error) {
      toast({
        title: "Conversion failed",
        description: error instanceof Error ? error.message : "Invalid JSON format",
        variant: "destructive"
      });
    }
  };

  const downloadCSV = () => {
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'converted.csv';
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
              "Drop your JSON file here"
            ) : (
              "Drag & drop your JSON file here, or click to select"
            )}
          </div>
          <p className="text-sm text-muted-foreground">
            Supports single JSON file up to 10MB
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="rounded-lg border bg-card">
          <div className="flex items-center justify-between px-4 py-2 border-b">
            <div className="flex items-center gap-2">
              <FileJson className="h-4 w-4" />
              <p className="font-medium">JSON Input</p>
            </div>
            <Button onClick={convertToCSV} size="sm">
              Convert to CSV
            </Button>
          </div>
          <div className="p-5">
            <Textarea
              value={jsonContent}
              onChange={(e) => handleJsonInput(e.target.value)}
              placeholder="Paste your JSON array here..."
              className="min-h-[200px] font-mono text-sm"
            />
          </div>
        </div>

        {tableData.headers.length > 0 && (
          <div className="rounded-lg border bg-card">
            <div className="flex items-center justify-between px-4 py-2 border-b">
              <div className="flex items-center gap-2">
                <FileJson className="h-4 w-4" />
                <h3 className="font-medium">CSV Preview</h3>
              </div>
              <Button onClick={downloadCSV} size="sm" variant="outline">
                <Download className="h-4 w-4 mr-2" />
                Download CSV
              </Button>
            </div>
            <div className="p-4 overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    {tableData.headers.map((header) => (
                      <TableHead key={header}>{header}</TableHead>
                    ))}
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {tableData.rows.map((row, index) => (
                    <TableRow key={index}>
                      {tableData.headers.map((header) => (
                        <TableCell key={header}>
                          {typeof row[header] === 'object'
                            ? JSON.stringify(row[header])
                            : String(row[header])}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}