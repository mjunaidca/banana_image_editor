// This server-side only version should only be used in API routes or server components
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import 'server-only';

interface ProcessImageAndPromptResult {
  success: boolean;
  outputImage: string;
  outputPrompt: string;
  error?: string;
  status: 'success' | 'error';
}

/**
 * Process a prompt using Google Gemini AI to generate an image
 * NOTE: This function can only be used on the server side
 * @param prompt The text prompt to use for generating an image
 * @returns The generated image result from the AI
 */
export async function processImageAndPrompt(
  prompt: string
): Promise<ProcessImageAndPromptResult> {
  try {
    if (!prompt.trim()) {
      return {
        success: false,
        outputImage: '',
        outputPrompt: '',
        error: 'Prompt cannot be empty',
        status: 'error',
      };
    }

    // Initialize Google Generative AI and generate text + image
    const result = await generateText({
      model: google('gemini-2.5-flash-image-preview'),
      prompt: prompt,
    });

    // Check if any files were generated, particularly images
    let outputImage = '';
    if (result.files && result.files.length > 0) {
      for (const file of result.files) {
        if (file.mediaType.startsWith('image/')) {
          // Get the base64 encoded image data
          outputImage = file.base64;
          break;
        }
      }
    }

    return {
      success: true,
      outputImage: outputImage, // Return the generated image as base64
      outputPrompt: result.text, // Return the generated text as well
      status: 'success',
    };
  } catch (error) {
    console.error('Error processing prompt:', error);
    return {
      success: false,
      outputImage: '',
      outputPrompt: '',
      error: error instanceof Error ? error.message : 'An unknown error occurred',
      status: 'error',
    };
  }
}