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
  const [isConverting, setIsConverting] = useState<boolean>(false);
  const [jsonError, setJsonError] = useState<string>('');
  const { toast } = useToast();

  // Helper function to get user-friendly JSON error messages
  const getJsonErrorMessage = (error: Error): string => {
    const errorMessage = error.message;
    
    if (errorMessage.includes('Unexpected token')) {
      return 'JSON syntax error: Check for missing commas, brackets, or quotes';
    } else if (errorMessage.includes('Unexpected end')) {
      return 'JSON is incomplete: Check for missing closing brackets or quotes';
    } else if (errorMessage.includes('Unexpected number')) {
      return 'JSON number format error: Check for invalid number values';
    } else if (errorMessage.includes('Unexpected string')) {
      return 'JSON string format error: Check for unescaped quotes or invalid characters';
    } else if (errorMessage.includes('Unexpected identifier')) {
      return 'JSON format error: Check for unquoted property names or invalid syntax';
    } else if (errorMessage.includes('Unexpected comma')) {
      return 'JSON syntax error: Check for trailing commas';
    } else if (errorMessage.includes('Unexpected property')) {
      return 'JSON syntax error: Check for duplicate property names';
    }
    
    return 'Invalid JSON format';
  };

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
          setJsonError('');
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
    
    // Clear previous error if input is empty
    if (!value.trim()) {
      setJsonError('');
      return;
    }
    
    // Validate JSON format in real-time
    try {
      const json = JSON.parse(value);
      if (!Array.isArray(json)) {
        setJsonError('JSON must be an array of objects');
      } else if (json.length === 0) {
        setJsonError('JSON array is empty');
      } else if (!json.every(item => typeof item === 'object' && item !== null)) {
        setJsonError('All items in the JSON array must be objects');
      } else {
        setJsonError('');
      }
    } catch (error) {
      setJsonError(getJsonErrorMessage(error instanceof Error ? error : new Error('Invalid JSON format')));
    }
  };

  const convertToCSV = async () => {
    // Check if JSON content is empty
    if (!jsonContent.trim()) {
      toast({
        title: "No JSON content",
        description: "Please enter or upload JSON data to convert.",
        variant: "destructive"
      });
      return;
    }

    setIsConverting(true);
    
    // Add a small delay to show loading state for better UX
    await new Promise(resolve => setTimeout(resolve, 100));
    
    try {
      let json;
      try {
        json = JSON.parse(jsonContent);
      } catch (parseError) {
        throw new Error(getJsonErrorMessage(parseError instanceof Error ? parseError : new Error('Invalid JSON format')));
      }
      
      if (!Array.isArray(json)) {
        throw new Error('JSON must be an array of objects');
      }
      
      if (json.length === 0) {
        throw new Error('JSON array is empty');
      }

      // Check if all items are objects
      if (!json.every(item => typeof item === 'object' && item !== null)) {
        throw new Error('All items in the JSON array must be objects');
      }

      const headers = Object.keys(json[0]);
      
      if (headers.length === 0) {
        throw new Error('The first object in the array has no properties');
      }

      const csvRows = [headers.join(',')];

      for (const row of json) {
        const values = headers.map(header => {
          const val = row[header];
          if (val === null || val === undefined) {
            return '';
          }
          if (typeof val === 'string') {
            return `"${val.replace(/"/g, '""')}"`;
          }
          if (typeof val === 'object') {
            return `"${JSON.stringify(val).replace(/"/g, '""')}"`;
          }
          const stringVal = String(val);
          // Quote the value if it contains a comma, newline, or quote
          if (stringVal.includes(',') || stringVal.includes('\n') || stringVal.includes('"')) {
            return `"${stringVal.replace(/"/g, '""')}"`;
          }
          return stringVal;
        });
        csvRows.push(values.join(','));
      }

      setCsvContent(csvRows.join('\n'));
      setTableData({ headers, rows: json });
      
      toast({
        title: "Conversion successful",
        description: `Converted ${json.length} rows with ${headers.length} columns to CSV format.`
      });
    } catch (error) {
      console.error('Conversion error:', error);
      toast({
        title: "Conversion failed",
        description: error instanceof Error ? error.message : "Invalid JSON format",
        variant: "destructive"
      });
    } finally {
      setIsConverting(false);
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
            <Button 
              onClick={convertToCSV} 
              size="sm"
              disabled={!jsonContent.trim() || isConverting || !!jsonError}
              className={!jsonContent.trim() || jsonError ? "opacity-50 cursor-not-allowed" : ""}
            >
              {isConverting ? "Converting..." : "Convert to CSV"}
            </Button>
          </div>
          <div className="p-5">
            <Textarea
              value={jsonContent}
              onChange={(e) => handleJsonInput(e.target.value)}
              placeholder={`[
  {"name": "John", "age": 30, "city": "New York"},
  {"name": "Jane", "age": 25, "city": "Los Angeles"},
  {"name": "Bob", "age": 35, "city": "Chicago"}
]`}
              className={`min-h-[200px] font-mono text-sm ${jsonError ? 'border-red-500 focus:border-red-500' : ''}`}
            />
            {jsonError ? (
              <p className="text-xs text-red-500 mt-2 flex items-center gap-1">
                <span className="w-1 h-1 bg-red-500 rounded-full"></span>
                {jsonError}
              </p>
            ) : (
              <p className="text-xs text-muted-foreground mt-2">
                Enter a JSON array of objects. Each object should have the same properties.
              </p>
            )}
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