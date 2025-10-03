# Quickstart Guide: Build Image Video Editor

## Prerequisites
- Node.js 18+ installed
- pnpm package manager installed
- Google Gemini API key

## Setup

1. **Initialize the project**:
   ```bash
   pnpx create-next-app@latest image-editor --typescript --tailwind --eslint
   cd image-editor
   ```

2. **Install additional dependencies**:
   ```bash
   pnpm add @ai-sdk/google ai-sdk
   pnpm add -D @types/node
   ```

3. **Install shadcn/ui components** (follow prompts to install required dependencies):
   ```bash
   pnpx shadcn-ui@latest init
   pnpx shadcn-ui@latest add card button input textarea
   ```

4. **Set up environment variables**:
   Create a `.env.local` file in the root directory:
   ```env
   GOOGLE_API_KEY=your_google_api_key_here
   ```

## Running the Application

1. **Start the development server**:
   ```bash
   pnpm dev
   ```

2. **Open your browser** to [http://localhost:3000](http://localhost:3000)

## Usage

1. **Upload an image** using the image upload component (supports JPG and PNG, max 5MB)
2. **Enter a text prompt** describing what you want to do with the image
3. **Click the submit button** to process the image and prompt with Google Gemini
4. **View the returned updated prompt** in the results section
5. **Copy or download** the returned prompt as needed

## Testing the Feature

1. **Verify image upload**: Ensure JPG and PNG files under 5MB can be uploaded
2. **Verify prompt input**: Ensure text can be entered and submitted
3. **Verify AI processing**: Ensure the system calls the AI and returns a response
4. **Verify error handling**: Try uploading unsupported file types to confirm error messages
5. **Verify result display**: Ensure returned prompts are displayed correctly