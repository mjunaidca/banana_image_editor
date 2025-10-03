// PromptData interface in app/types/prompt.ts
export interface PromptData {
  inputPrompt: string; // The original text prompt entered by the user
  outputPrompt: string; // The updated prompt returned by the AI
  createdAt: Date; // Timestamp when the prompt was created
  status: 'pending' | 'processing' | 'completed' | 'error'; // Current status of the processing
}