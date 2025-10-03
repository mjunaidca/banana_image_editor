import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ImageUploader } from '../../src/components/ImageUploader';
import '@testing-library/jest-dom';

// Integration test for image upload functionality in tests/integration/test_image_upload.ts
describe('Integration: Image Upload Functionality', () => {
  beforeEach(() => {
    // Mock URL.createObjectURL for image previews
    vi.spyOn(URL, 'createObjectURL').mockImplementation(() => 'mock-preview-url');
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it('should allow user to select a valid image file', async () => {
    const onImageChange = vi.fn();
    render(<ImageUploader onImageChange={onImageChange} />);

    const fileInput = screen.getByLabelText(/upload image/i) as HTMLInputElement;
    const validImage = new File(['test-image-content'], 'test.jpg', { type: 'image/jpeg' });

    fireEvent.change(fileInput, { target: { files: [validImage] } });

    await waitFor(() => {
      expect(onImageChange).toHaveBeenCalledWith(validImage);
    });
  });

  it('should reject invalid file types', async () => {
    const onImageChange = vi.fn();
    const onError = vi.fn();
    render(<ImageUploader onImageChange={onImageChange} onError={onError} />);

    const fileInput = screen.getByLabelText(/upload image/i) as HTMLInputElement;
    const invalidFile = new File(['test-content'], 'test.txt', { type: 'text/plain' });

    fireEvent.change(fileInput, { target: { files: [invalidFile] } });

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(expect.stringContaining('Invalid file type'));
      expect(onImageChange).not.toHaveBeenCalled();
    });
  });

  it('should reject files that exceed size limit', async () => {
    const onImageChange = vi.fn();
    const onError = vi.fn();
    render(<ImageUploader onImageChange={onImageChange} onError={onError} />);

    // Create a file larger than 5MB
    const largeFile = new File([new ArrayBuffer(6 * 1024 * 1024)], 'large.jpg', { type: 'image/jpeg' });
    const fileInput = screen.getByLabelText(/upload image/i) as HTMLInputElement;

    fireEvent.change(fileInput, { target: { files: [largeFile] } });

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith(expect.stringContaining('File size exceeds'));
      expect(onImageChange).not.toHaveBeenCalled();
    });
  });

  it('should show image preview after successful upload', async () => {
    const onImageChange = vi.fn();
    render(<ImageUploader onImageChange={onImageChange} />);

    const fileInput = screen.getByLabelText(/upload image/i) as HTMLInputElement;
    const validImage = new File(['test-image-content'], 'test.jpg', { type: 'image/jpeg' });

    fireEvent.change(fileInput, { target: { files: [validImage] } });

    await waitFor(() => {
      const preview = screen.getByAltText(/preview/i);
      expect(preview).toBeInTheDocument();
      expect(preview).toHaveAttribute('src', 'mock-preview-url');
    });
  });
});