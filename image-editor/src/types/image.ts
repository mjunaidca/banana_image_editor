// ImageData interface in app/types/image.ts
export interface ImageData {
  imageFile: File;
  fileName: string;
  fileSize: number; // Size in bytes
  fileType: string; // MIME type
  previewUrl: string; // URL for previewing the uploaded image
}