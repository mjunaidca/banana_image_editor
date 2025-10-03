import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { ImageUploader } from '../../src/components/ImageUploader';
import { PromptInput } from '../../src/components/PromptInput';
import { ProcessingResult } from '../../src/components/ProcessingResult';
import { ProcessingResult as ProcessingResultType } from '../../src/types';
import '@testing-library/jest-dom';

// Component tests for UI components in tests/components/
describe('UI Components', () => {
  describe('ImageUploader', () => {
    it('renders correctly', () => {
      render(<ImageUploader onImageChange={() => {}} />);
      
      expect(screen.getByText(/drag & drop your image here/i)).toBeInTheDocument();
      expect(screen.getByText(/or click to browse files/i)).toBeInTheDocument();
      expect(screen.getByText(/jpg or png, max 5mb/i)).toBeInTheDocument();
    });

    it('calls onImageChange when a valid file is selected', async () => {
      const onImageChange = vi.fn();
      render(<ImageUploader onImageChange={onImageChange} />);
      
      const fileInput = screen.getByLabelText(/upload image/i) as HTMLInputElement;
      const validImage = new File(['test-content'], 'test.jpg', { type: 'image/jpeg' });
      
      fireEvent.change(fileInput, { target: { files: [validImage] } });
      
      await waitFor(() => {
        expect(onImageChange).toHaveBeenCalledWith(
          expect.objectContaining({
            fileName: 'test.jpg',
            fileType: 'image/jpeg',
          })
        );
      });
    });

    it('shows error when invalid file type is selected', async () => {
      const onError = vi.fn();
      render(<ImageUploader onImageChange={() => {}} onError={onError} />);
      
      const fileInput = screen.getByLabelText(/upload image/i) as HTMLInputElement;
      const invalidFile = new File(['test-content'], 'test.txt', { type: 'text/plain' });
      
      fireEvent.change(fileInput, { target: { files: [invalidFile] } });
      
      await waitFor(() => {
        expect(onError).toHaveBeenCalledWith(
          expect.stringContaining('Invalid file type')
        );
      });
    });
  });

  describe('PromptInput', () => {
    it('renders correctly', () => {
      render(<PromptInput onSubmit={() => {}} />);
      
      expect(screen.getByRole('textbox')).toBeInTheDocument();
      expect(screen.getByRole('button', { name: /process image/i })).toBeInTheDocument();
    });

    it('allows user to enter and submit a prompt', async () => {
      const onSubmit = vi.fn();
      render(<PromptInput onSubmit={onSubmit} />);
      
      const textbox = screen.getByRole('textbox');
      fireEvent.change(textbox, { target: { value: 'Test prompt' } });
      
      const submitButton = screen.getByRole('button', { name: /process image/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(onSubmit).toHaveBeenCalledWith('Test prompt');
      });
    });

    it('shows error when empty prompt is submitted', async () => {
      const onError = vi.fn();
      render(<PromptInput onSubmit={() => {}} onError={onError} />);
      
      const submitButton = screen.getByRole('button', { name: /process image/i });
      fireEvent.click(submitButton);
      
      await waitFor(() => {
        expect(onError).toHaveBeenCalledWith('Prompt cannot be empty');
      });
    });

    it('disables submission when disabled prop is true', () => {
      render(<PromptInput onSubmit={() => {}} disabled={true} />);
      
      const submitButton = screen.getByRole('button', { name: /process image/i });
      expect(submitButton).toBeDisabled();
    });
  });

  describe('ProcessingResult', () => {
    it('renders correctly when no result is provided', () => {
      render(<ProcessingResult result={null} />);
      
      expect(screen.getByText(/results will appear here/i)).toBeInTheDocument();
      expect(screen.getByText(/submit an image and prompt to see results/i)).toBeInTheDocument();
    });

    it('renders correctly when processing', () => {
      render(<ProcessingResult result={null} processing={true} />);
      
      expect(screen.getByText(/processing your request/i)).toBeInTheDocument();
    });

    it('renders error state correctly', () => {
      const errorResult: ProcessingResultType = {
        id: 'test-id',
        originalImage: {
          imageFile: new File([], 'test.jpg'),
          fileName: 'test.jpg',
          fileSize: 1024,
          fileType: 'image/jpeg',
          previewUrl: 'test-url',
        },
        inputPrompt: 'Test prompt',
        outputPrompt: '',
        processingTime: 100,
        status: 'error',
        errorMessage: 'Test error message',
      };
      
      render(<ProcessingResult result={errorResult} />);
      
      expect(screen.getByText(/test error message/i)).toBeInTheDocument();
    });

    it('renders success state correctly', () => {
      const successResult: ProcessingResultType = {
        id: 'test-id',
        originalImage: {
          imageFile: new File([], 'test.jpg'),
          fileName: 'test.jpg',
          fileSize: 1024,
          fileType: 'image/jpeg',
          previewUrl: 'test-url',
        },
        inputPrompt: 'Test input prompt',
        outputPrompt: 'Test output prompt',
        processingTime: 100,
        status: 'success',
      };
      
      render(<ProcessingResult result={successResult} />);
      
      expect(screen.getByText(/test input prompt/i)).toBeInTheDocument();
      expect(screen.getByText(/test output prompt/i)).toBeInTheDocument();
      expect(screen.getByText(/processed in 100ms/i)).toBeInTheDocument();
    });
  });
});