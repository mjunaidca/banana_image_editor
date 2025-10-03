import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { PromptInput } from '../../src/components/PromptInput';
import '@testing-library/jest-dom';

// Integration test for prompt processing flow in tests/integration/test_prompt_processing.ts
describe('Integration: Prompt Processing Flow', () => {
  it('should allow user to input and submit a text prompt', async () => {
    const onSubmit = vi.fn();
    render(<PromptInput onSubmit={onSubmit} />);

    const promptTextarea = screen.getByRole('textbox');
    fireEvent.change(promptTextarea, { target: { value: 'Test prompt for processing' } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith('Test prompt for processing');
    });
  });

  it('should validate that prompt is not empty before submission', async () => {
    const onSubmit = vi.fn();
    const onError = vi.fn();
    render(<PromptInput onSubmit={onSubmit} onError={onError} />);

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(onError).toHaveBeenCalledWith('Prompt cannot be empty');
      expect(onSubmit).not.toHaveBeenCalled();
    });
  });

  it('should allow editing of the prompt text', async () => {
    render(<PromptInput />);

    const promptTextarea = screen.getByRole('textbox');
    fireEvent.change(promptTextarea, { target: { value: 'Updated prompt text' } });

    expect(promptTextarea).toHaveValue('Updated prompt text');
  });

  it('should clear the prompt after successful submission', async () => {
    const onSubmit = vi.fn().mockResolvedValue({ success: true, outputPrompt: 'Processed result' });
    render(<PromptInput onSubmit={onSubmit} />);

    const promptTextarea = screen.getByRole('textbox');
    fireEvent.change(promptTextarea, { target: { value: 'Test prompt' } });

    const submitButton = screen.getByRole('button', { name: /submit/i });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(promptTextarea).toHaveValue('');
    });
  });
});