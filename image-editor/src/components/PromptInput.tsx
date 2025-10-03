'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface PromptInputProps {
  onSubmit: (prompt: string) => void;
  onError?: (error: string) => void;
  disabled?: boolean;
}

export const PromptInput = ({ onSubmit, onError, disabled }: PromptInputProps) => {
  const [prompt, setPrompt] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!prompt.trim()) {
      onError?.('Prompt cannot be empty');
      return;
    }
    
    onSubmit(prompt);
    setPrompt(''); // Clear the prompt after submission
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Text Prompt</CardTitle>
        <CardDescription>Describe what you want to do with the image</CardDescription>
      </CardHeader>
      <form onSubmit={handleSubmit}>
        <CardContent>
          <Textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe what you want to do with the image..."
            className="min-h-[120px]"
            disabled={disabled}
          />
        </CardContent>
        <CardFooter>
          <Button 
            type="submit" 
            className="w-full"
            disabled={disabled || !prompt.trim()}
          >
            Generate Image
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};