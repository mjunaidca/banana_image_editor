import { describe, it, expect } from 'vitest';
import { formatFileSize, isValidImageType, isFileSizeValid, generateImagePreview } from '../../src/lib/utils';

// Unit test for utility functions in tests/unit/test_utils.ts
describe('Utility Functions', () => {
  describe('formatFileSize', () => {
    it('should format bytes to human-readable format', () => {
      expect(formatFileSize(0)).toBe('0 Bytes');
      expect(formatFileSize(1)).toBe('1 Bytes');
      expect(formatFileSize(1024)).toBe('1 KB');
      expect(formatFileSize(1025)).toBe('1 KB');
      expect(formatFileSize(2048)).toBe('2 KB');
      expect(formatFileSize(1024 * 1024)).toBe('1 MB');
      expect(formatFileSize(1024 * 1024 * 5)).toBe('5 MB');
    });
  });

  describe('isValidImageType', () => {
    it('should return true for valid image types', () => {
      const jpegFile = new File([], 'test.jpg', { type: 'image/jpeg' });
      const pngFile = new File([], 'test.png', { type: 'image/png' });
      
      expect(isValidImageType(jpegFile)).toBe(true);
      expect(isValidImageType(pngFile)).toBe(true);
    });

    it('should return false for invalid image types', () => {
      const gifFile = new File([], 'test.gif', { type: 'image/gif' });
      const txtFile = new File([], 'test.txt', { type: 'text/plain' });
      
      expect(isValidImageType(gifFile)).toBe(false);
      expect(isValidImageType(txtFile)).toBe(false);
    });
  });

  describe('isFileSizeValid', () => {
    it('should return true for files within size limit', () => {
      // Create a file smaller than 5MB
      const smallFile = new File([new ArrayBuffer(1024 * 1024)], 'small.jpg', { type: 'image/jpeg' }); // 1MB
      
      expect(isFileSizeValid(smallFile)).toBe(true);
    });

    it('should return false for files exceeding size limit', () => {
      // Create a file larger than 5MB
      const largeFile = new File([new ArrayBuffer(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' }); // 6MB
      
      expect(isFileSizeValid(largeFile)).toBe(false);
    });
  });

  describe('generateImagePreview', () => {
    it('should generate a preview URL for a valid image file', async () => {
      const imageFile = new File(['test-image-content'], 'test.jpg', { type: 'image/jpeg' });
      
      const previewUrl = await generateImagePreview(imageFile);
      
      expect(previewUrl).toBeDefined();
      expect(typeof previewUrl).toBe('string');
      expect(previewUrl.startsWith('data:image')).toBe(true);
    });

    it('should reject for invalid file', async () => {
      // Use a mock file that will cause an error
      const mockFile = {
        type: 'image/jpeg',
        size: 100,
        name: 'test.jpg',
        arrayBuffer: () => Promise.reject(new Error('Error reading file'))
      } as unknown as File;
      
      await expect(generateImagePreview(mockFile)).rejects.toThrow('Error reading file for preview');
    });
  });
});