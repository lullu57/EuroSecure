"use client";

import { useState, useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { File, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface FileUploaderProps {
  onFileSelect: (file: File | null) => void;
  maxSize: number;

}

export function FileUploader({ onFileSelect, maxSize }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      const selected = acceptedFiles[0];

      if (selected.size > maxSize) {
        setError("File size exceeds the maximum allowed limit.");
        return;
      }


      setFile(selected);
      onFileSelect(selected);
      setError(null);
    },
    [maxSize, onFileSelect]
  );

  // Remove accept to allow all files
  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxSize,
    multiple: false,
  });

  const removeFile = () => {
    setFile(null);
    onFileSelect(null);
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors",
          isDragActive ? "border-primary bg-primary/5" : "border-border",
          error && "border-destructive"
        )}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          <File className="w-12 h-12 mx-auto text-muted-foreground" />
          {isDragActive ? (
            <p>Drop your file here...</p>
          ) : (
            <div>
              <p>Drag & drop your file here, or click to select</p>
              <p className="text-sm text-muted-foreground mt-2">
                ONLY PDF ALLOWED! (max {maxSize / (1024 * 1024)}MB)
              </p>
            </div>
          )}
        </div>
      </div>

      {error && (
        <p className="text-sm text-destructive">{error}</p>
      )}

      {file && (
        <div className="flex items-center justify-between p-4 bg-secondary/10 rounded-lg">
          <div className="flex items-center space-x-4">
            <File className="w-6 h-6 text-secondary" />
            <div>
              <p className="font-medium">{file.name}</p>
              <p className="text-sm text-muted-foreground">
                {(file.size / 1024 / 1024).toFixed(2)}MB
              </p>
            </div>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={removeFile}
            className="text-muted-foreground hover:text-foreground"
          >
            <X className="w-4 h-4" />
          </Button>
        </div>
      )}
    </div>
  );
}
