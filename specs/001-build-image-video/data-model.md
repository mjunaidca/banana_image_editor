# Data Model: Build Image Video Editor

## Entities

### ImageData
- **imageFile**: File - The uploaded image file (JPG/PNG format)
- **fileName**: string - Name of the uploaded file
- **fileSize**: number - Size of the file in bytes (max 5MB as per requirements)
- **fileType**: string - MIME type of the uploaded image
- **previewUrl**: string - URL for previewing the uploaded image

### PromptData
- **inputPrompt**: string - The original text prompt entered by the user
- **outputPrompt**: string - The updated prompt returned by the AI
- **createdAt**: Date - Timestamp when the prompt was created
- **status**: 'pending' | 'processing' | 'completed' | 'error' - Current status of the processing

### ProcessingResult
- **id**: string - Unique identifier for the processing result
- **originalImage**: ImageData - The input image that was processed
- **inputPrompt**: string - The original prompt provided by the user
- **outputPrompt**: string - The updated prompt returned by the AI
- **processingTime**: number - Time taken for processing in milliseconds
- **status**: 'success' | 'error' - Result status
- **errorMessage**: string? - Error message if processing failed

## Validation Rules
- Image files must be in JPG or PNG format (as per spec requirement FR-001)
- Image files must not exceed 5MB (as per spec requirement FR-008)
- Input prompt must not be empty
- Processing results should be retained temporarily for user access

## Relationships
The entities are primarily used for UI state management since this is a client-side application with no persistent storage. The ProcessingResult contains both the ImageData and PromptData that were used to generate it.