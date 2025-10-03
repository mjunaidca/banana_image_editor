import { google } from '@ai-sdk/google';
import { generateText } from 'ai';
import 'server-only';
import { NextRequest } from 'next/server';
import { z } from 'zod';

// Define the request schema
const ProcessRequestSchema = z.object({
  prompt: z.string().min(1, 'Prompt is required'),
  imageData: z.object({
    fileName: z.string(),
    fileSize: z.number(),
    fileType: z.string(),
    base64Data: z.string(),
  }).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsedBody = ProcessRequestSchema.parse(body);

    let result;
    
    if (parsedBody.imageData) {
      // We have image data, process with image and prompt
      // Convert base64 image data to a Uint8Array for the AI model
      const uint8Array = new Uint8Array(
        Buffer.from(parsedBody.imageData.base64Data, 'base64')
      );

      result = await generateText({
        model: google('gemini-2.5-flash-image-preview'),
        messages: [
          {
            role: 'user',
            content: [
              {
                type: 'image',
                image: uint8Array,
              },
              {
                type: 'text',
                text: parsedBody.prompt,
              },
            ],
          },
        ],
      });
    } else {
      // Just text prompt
      result = await generateText({
        model: google('gemini-2.5-flash-image-preview'),
        messages: [
          {
            role: 'user',
            content: parsedBody.prompt,
          },
        ],
      });
    }

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

    return new Response(
      JSON.stringify({ 
        success: true, 
        outputImage: outputImage, // Return the generated image as base64
        outputPrompt: result.text, // Return the generated text as well
        status: 'success' as const
      }),
      { 
        status: 200,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  } catch (error) {
    console.error('Error processing prompt in API:', error);
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        outputImage: '',
        outputPrompt: '',
        error: error instanceof Error ? error.message : 'An unknown error occurred',
        status: 'error' as const
      }),
      { 
        status: 500,
        headers: { 'Content-Type': 'application/json' }
      }
    );
  }
}