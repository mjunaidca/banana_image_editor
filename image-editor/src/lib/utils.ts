import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

/**
 * Format file size in bytes to human-readable format
 * @param bytes File size in bytes
 * @returns Human-readable file size string
 */
export function formatFileSize(bytes: number): string {
  if (bytes === 0) return '0 Bytes';
  
  const k = 1024;
  const sizes = ['Bytes', 'KB', 'MB', 'GB'];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
}

/**
 * Validate if a file is of an allowed image type
 * @param file The file to validate
 * @returns True if the file is a valid image type, false otherwise
 */
export function isValidImageType(file: File): boolean {
  const validTypes = ['image/jpeg', 'image/png'];
  return validTypes.includes(file.type);
}

/**
 * Validate if a file size is within the allowed limit (5MB)
 * @param file The file to validate
 * @returns True if the file size is within limit, false otherwise
 */
export function isFileSizeValid(file: File): boolean {
  const maxSize = 5 * 1024 * 1024; // 5MB in bytes
  return file.size <= maxSize;
}

/**
 * Generate a preview URL for an image file
 * @param file The image file to generate preview for
 * @returns Promise that resolves to the preview URL
 */
export function generateImagePreview(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    
    reader.onload = () => {
      if (typeof reader.result === 'string') {
        resolve(reader.result);
      } else {
        reject(new Error('Could not generate preview for file'));
      }
    };
    
    reader.onerror = () => {
      reject(new Error('Error reading file for preview'));
    };
    
    reader.readAsDataURL(file);
  });
}