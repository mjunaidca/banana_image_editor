'use client';

import { useCallback, useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ImageData } from '@/types';

interface ImageUploaderProps {
  onImageChange: (imageData: ImageData) => void;
  onError?: (error: string) => void;
}

export const ImageUploader = ({ onImageChange, onError }: ImageUploaderProps) => {
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [fileName, setFileName] = useState<string>('');
  const [isDragging, setIsDragging] = useState(false);

  const validateFile = (file: File): boolean => {
    // Check file type
    if (!file.type.match('image/jpeg|image/png')) {
      onError?.('Invalid file type. Please upload a JPG or PNG image.');
      return false;
    }

    // Check file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      onError?.('File size exceeds 5MB limit. Please upload a smaller image.');
      return false;
    }

    return true;
  };

  const handleFileChange = (file: File) => {
    if (!validateFile(file)) {
      return;
    }

    const imageData: ImageData = {
      imageFile: file,
      fileName: file.name,
      fileSize: file.size,
      fileType: file.type,
      previewUrl: URL.createObjectURL(file),
    };

    setPreviewUrl(imageData.previewUrl);
    setFileName(imageData.fileName);
    onImageChange(imageData);
  };

  const onFileSelected = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  }, [onImageChange, onError]);

  const onDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const onDragLeave = () => {
    setIsDragging(false);
  };

  const onDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);

    const files = e.dataTransfer.files;
    if (files && files.length > 0) {
      handleFileChange(files[0]);
    }
  };

  return (
    <Card className={isDragging ? 'border-2 border-dashed border-blue-500' : ''}>
      <CardHeader>
        <CardTitle>Upload Image</CardTitle>
        <CardDescription>Supports JPG and PNG formats, max 5MB</CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className={`border-2 border-dashed rounded-lg p-6 text-center cursor-pointer transition-colors
            ${isDragging ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-gray-400'}`}
          onDragOver={onDragOver}
          onDragLeave={onDragLeave}
          onDrop={onDrop}
          onClick={() => document.getElementById('file-upload')?.click()}
        >
          {previewUrl ? (
            <div className="flex flex-col items-center">
              <img 
                src={previewUrl} 
                alt="Preview" 
                className="max-h-40 rounded-lg object-contain mb-4"
              />
              <p className="text-sm text-gray-600">{fileName}</p>
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center py-8">
              <svg 
                className="w-12 h-12 text-gray-400 mb-4" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24" 
                xmlns="http://www.w3.org/2000/svg"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth="2" 
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                ></path>
              </svg>
              <p className="text-gray-600 mb-1">Drag & drop your image here</p>
              <p className="text-gray-400 text-sm">or click to browse files</p>
            </div>
          )}
          <Input
            id="file-upload"
            type="file"
            accept="image/jpeg,image/png"
            onChange={onFileSelected}
            className="hidden"
          />
        </div>
      </CardContent>
      <CardFooter>
        <p className="text-sm text-gray-500">JPG or PNG, max 5MB</p>
      </CardFooter>
    </Card>
  );
};