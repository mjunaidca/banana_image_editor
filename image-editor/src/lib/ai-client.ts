import type { ImageData } from '@/types';

interface ProcessImageAndPromptResult {
  success: boolean;
  outputPrompt: string;
  outputImage: string; // Base64 encoded image
  error?: string;
  status: 'success' | 'error';
}

/**
 * Process a prompt using the API endpoint to generate an image
 * @param prompt The text prompt to use
 * @param imageData Optional image data to process alongside the prompt
 * @returns The processed result from the AI
 */
export async function processImageAndPrompt(
  prompt: string,
  imageData?: ImageData | null
): Promise<ProcessImageAndPromptResult> {
  try {
    const requestBody: { prompt: string, imageData?: { 
      fileName: string; 
      fileSize: number; 
      fileType: string; 
      base64Data: string; 
    } } = {
      prompt: prompt,
    };

    if (imageData) {
      // Convert image file to base64 for transmission
      const reader = new FileReader();
      reader.readAsDataURL(imageData.imageFile);
      
      // Create a promise to handle the asynchronous conversion
      const imageBase64Promise = new Promise<string>((resolve, reject) => {
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = (error) => reject(error);
      });
      
      try {
        const imageBase64 = await imageBase64Promise;
        requestBody.imageData = {
          fileName: imageData.fileName,
          fileSize: imageData.fileSize,
          fileType: imageData.fileType,
          base64Data: imageBase64.split(',')[1], // Extract base64 data part
        };
      } catch (error) {
        return {
          success: false,
          outputPrompt: '',
          outputImage: '',
          error: 'Failed to read image file',
          status: 'error',
        };
      }
    }

    // Call the API endpoint
    const response = await fetch('/api/process', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestBody),
    });

    const result: ProcessImageAndPromptResult = await response.json();

    return result;
  } catch (error) {
    console.error('Error processing prompt:', error);
    return {
      success: false,
      outputPrompt: '',
      outputImage: '',
      error: error instanceof Error ? error.message : 'An unknown error occurred',
      status: 'error',
    };
  }
}