# Image Video Editor

Upload an image and provide a text prompt to generate an updated prompt using Google Gemini AI.

## Features

- Upload JPG and PNG images (max 5MB)
- Enter text prompts describing what you want to do with the image
- Process images and prompts using Google Gemini AI
- View and copy the generated results

## Getting Started

### Prerequisites

- Node.js 18+ installed
- pnpm package manager installed
- Google Gemini API key

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd image-editor
   ```

2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Set up environment variables:
   Create a `.env.local` file in the root directory with your Google API key:
   ```env
   GOOGLE_API_KEY=your_google_api_key_here
   ```

### Running the Application

1. Start the development server:
   ```bash
   pnpm dev
   ```

2. Open your browser to [http://localhost:3000](http://localhost:3000)

### Usage

1. Upload an image using the image upload component (supports JPG and PNG, max 5MB)
2. Enter a text prompt describing what you want to do with the image
3. Click the submit button to process the image and prompt with Google Gemini
4. View the returned updated prompt in the results section
5. Copy or download the returned prompt as needed

## Development

### Available Scripts

- `pnpm dev` - Start the development server
- `pnpm build` - Build the application for production
- `pnpm start` - Start the production server
- `pnpm lint` - Run ESLint
- `pnpm format` - Format code with Prettier

### Project Structure

```
src/
├── app/                 # Next.js app router pages
│   ├── page.tsx         # Main application page
│   └── layout.tsx       # Root layout
├── components/          # React components
│   ├── ImageUploader.tsx
│   ├── PromptInput.tsx
│   ├── ProcessingResult.tsx
│   └── ui/              # shadcn/ui components
├── lib/                 # Utility functions and services
│   ├── ai.ts           # Google Gemini AI integration
│   ├── utils.ts        # Utility functions
│   └── env.ts          # Environment validation
├── types/              # TypeScript type definitions
│   ├── image.ts        # ImageData interface
│   ├── prompt.ts       # PromptData interface
│   └── result.ts       # ProcessingResult interface
└── tests/              # Test files
    ├── unit/           # Unit tests
    ├── integration/    # Integration tests
    └── contract/       # Contract tests
```

## Testing

Run all tests:
```bash
pnpm test
```

Run unit tests:
```bash
pnpm test:unit
```

Run integration tests:
```bash
pnpm test:integration
```

## Environment Variables

- `GOOGLE_API_KEY` - Your Google Gemini API key (required)

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Make your changes
4. Run tests (`pnpm test`)
5. Commit your changes (`git commit -m 'Add amazing feature'`)
6. Push to the branch (`git push origin feature/amazing-feature`)
7. Open a pull request
