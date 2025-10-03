import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { ProcessingResult } from '../../src/components/ProcessingResult';
import '@testing-library/jest-dom';

// Integration test for result display functionality in tests/integration/test_result_display.ts
describe('Integration: Result Display Functionality', () => {
  it('should display the processing result when provided', () => {
    const mockResult = {
      id: 'test-id',
      originalImage: new File([], 'test.jpg', { type: 'image/jpeg' }),
      inputPrompt: 'Original input prompt',
      outputPrompt: 'Updated output prompt from AI',
      processingTime: 1200,
      status: 'success' as const,
    };

    render(<ProcessingResult result={mockResult} />);

    expect(screen.getByText(/Updated output prompt from AI/i)).toBeInTheDocument();
    expect(screen.getByText(/Original input prompt/i)).toBeInTheDocument();
  });

  it('should display error message when processing fails', () => {
    const mockResult = {
      id: 'test-id',
      originalImage: new File([], 'test.jpg', { type: 'image/jpeg' }),
      inputPrompt: 'Original input prompt',
      outputPrompt: '',
      processingTime: 500,
      status: 'error' as const,
      errorMessage: 'Processing failed due to invalid input'
    };

    render(<ProcessingResult result={mockResult} />);

    expect(screen.getByText(/Processing failed due to invalid input/i)).toBeInTheDocument();
    expect(screen.getByText(/Error occurred during processing/i)).toBeInTheDocument();
  });

  it('should show processing state when result is still being processed', () => {
    const mockResult = {
      id: 'test-id',
      originalImage: new File([], 'test.jpg', { type: 'image/jpeg' }),
      inputPrompt: 'Original input prompt',
      outputPrompt: '',
      processingTime: 0,
      status: 'success' as const,
    };

    // We may need to pass an additional processing state prop
    render(<ProcessingResult result={mockResult} processing={true} />);

    expect(screen.getByText(/Processing.../i)).toBeInTheDocument();
  });

  it('should display input and output prompts clearly', () => {
    const mockResult = {
      id: 'test-id',
      originalImage: new File([], 'test.jpg', { type: 'image/jpeg' }),
      inputPrompt: 'How can I improve this image?',
      outputPrompt: 'You can enhance the colors and add more contrast to make it pop.',
      processingTime: 1500,
      status: 'success' as const,
    };

    render(<ProcessingResult result={mockResult} />);

    expect(screen.getByText(/How can I improve this image\?/i)).toBeInTheDocument();
    expect(screen.getByText(/You can enhance the colors and add more contrast/i)).toBeInTheDocument();
  });
});