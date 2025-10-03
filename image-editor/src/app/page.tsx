'use client';

import { useState } from 'react';
import { PromptInput } from '@/components/PromptInput';
import { ProcessingResult } from '@/components/ProcessingResult';
import { ImageUploader } from '@/components/ImageUploader';
import type { ProcessingResult as ProcessingResultType, ImageData } from '@/types';
import { processImageAndPrompt } from '@/lib/ai-client';

export default function Home() {
  const [processingResult, setProcessingResult] = useState<ProcessingResultType | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [imageData, setImageData] = useState<ImageData | null>(null);

  const handlePromptSubmit = async (prompt: string) => {
    if (!prompt.trim() && !imageData) {
      setError('Either a prompt or an image is required');
      return;
    }
    
    setIsProcessing(true);
    setError(null);

    try {
      // Call the AI service to process the prompt and generate an image
      const startTime = Date.now();
      const aiResult = await processImageAndPrompt(prompt, imageData);
      const processingTime = Date.now() - startTime;

      const aiProcessingResult: ProcessingResultType = {
        id: `result-${Date.now()}`,
        inputPrompt: prompt,
        outputPrompt: aiResult.outputPrompt,
        generatedImage: aiResult.outputImage,
        processingTime: processingTime,
        status: aiResult.status,
        ...(aiResult.status === 'error' && { errorMessage: aiResult.error }),
      };

      setProcessingResult(aiProcessingResult);
    } catch (err) {
      const errorResult: ProcessingResultType = {
        id: `result-${Date.now()}`,
        inputPrompt: prompt,
        outputPrompt: '',
        processingTime: 0,
        status: 'error',
        errorMessage: err instanceof Error ? err.message : 'An unknown error occurred',
      };
      
      setProcessingResult(errorResult);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleImageChange = (newImageData: ImageData) => {
    setImageData(newImageData);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 py-12 px-4 sm:px-6">
      <div className="max-w-4xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">AI Image Generator</h1>
          <p className="text-gray-600">Enter a text prompt or upload an image to generate an AI image</p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-md p-6">
              <ImageUploader 
                onImageChange={handleImageChange} 
                onError={(err) => setError(err)}
              />
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-6">
              <PromptInput 
                onSubmit={handlePromptSubmit} 
                onError={(err) => setError(err)}
                disabled={isProcessing}
              />
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md p-6 h-fit">
            <ProcessingResult 
              result={processingResult} 
              processing={isProcessing}
            />
          </div>
        </div>

        {error && (
          <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
            {error}
          </div>
        )}
      </div>
    </div>
  );
}
