// ProcessingResult interface in app/types/result.ts

export interface ProcessingResult {
  id: string; // Unique identifier for the processing result
  inputPrompt: string; // The original prompt provided by the user
  outputPrompt: string; // The generated text returned by the AI
  generatedImage?: string; // Base64 encoded generated image data
  processingTime: number; // Time taken for processing in milliseconds
  status: 'success' | 'error'; // Result status
  errorMessage?: string; // Error message if processing failed
}