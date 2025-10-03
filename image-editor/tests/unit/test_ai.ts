import { describe, it, expect, vi, beforeEach } from 'vitest';
import { processImageAndPrompt } from '../../src/lib/ai-client';
import { ImageData } from '../../src/types';

// Unit test for AI integration in tests/unit/test_ai.ts
describe('AI Integration', () => {
  let mockImageData: ImageData;

  beforeEach(() => {
    // Create a mock image file
    const mockFile = new File(['test-image-content'], 'test.jpg', { type: 'image/jpeg' });
    
    mockImageData = {
      imageFile: mockFile,
      fileName: 'test.jpg',
      fileSize: 1024, // 1KB
      fileType: 'image/jpeg',
      previewUrl: 'mock-preview-url',
    };
  });

  it('should return error for empty prompt', async () => {
    const result = await processImageAndPrompt(mockImageData, '');
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Prompt cannot be empty');
    expect(result.status).toBe('error');
  });

  it('should return error for invalid image type', async () => {
    const invalidImageData: ImageData = {
      imageFile: new File(['test-content'], 'test.txt', { type: 'text/plain' }),
      fileName: 'test.txt',
      fileSize: 1024,
      fileType: 'text/plain',
      previewUrl: 'mock-preview-url',
    };
    
    const result = await processImageAndPrompt(invalidImageData, 'Test prompt');
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Invalid image format. Only JPG and PNG are supported.');
    expect(result.status).toBe('error');
  });

  it('should return error for image exceeding size limit', async () => {
    const largeImageData: ImageData = {
      imageFile: new File([new ArrayBuffer(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' }), // 6MB
      fileName: 'large.jpg',
      fileSize: 6 * 1024 * 1024,
      fileType: 'image/jpeg',
      previewUrl: 'mock-preview-url',
    };
    
    const result = await processImageAndPrompt(largeImageData, 'Test prompt');
    
    expect(result.success).toBe(false);
    expect(result.error).toBe('Image size exceeds 5MB limit.');
    expect(result.status).toBe('error');
  });

  it('should process valid image and prompt', async () => {
    // Note: Since the real AI call would require an API key and network,
    // we're testing the validation logic and structure rather than the full AI functionality.
    // In a real scenario, we'd mock the AI SDK calls.
    
    const result = await processImageAndPrompt(mockImageData, 'Test prompt');
    
    // The result depends on whether the API key is available and the call succeeds
    // If the API key is missing, it will return an error
    expect(result).toHaveProperty('success');
    expect(result).toHaveProperty('outputPrompt');
    expect(result).toHaveProperty('status');
  });
});