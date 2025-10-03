# Environment Variables

This document describes the environment variables required for the Image Video Editor application.

## Required Variables

### GOOGLE_API_KEY

- **Description**: Your Google Gemini API key for accessing the AI service
- **Type**: String
- **Required**: Yes
- **Example**: `GOOGLE_API_KEY=your_actual_api_key_here`

## How to Obtain a Google Gemini API Key

1. Go to the [Google AI Studio](https://aistudio.google.com/)
2. Sign in with your Google account
3. Click on "Get API Key" or "Create API Key"
4. Follow the instructions to create a new API key
5. Make sure to enable the appropriate Gemini models for your API key
6. Keep your API key secure and never share it publicly

## Setting Up Environment Variables

Create a `.env.local` file in the root directory of the project and add your environment variables:

```env
GOOGLE_API_KEY=your_actual_api_key_here
```

**Important**: The `.env.local` file should be added to your `.gitignore` file to prevent accidentally committing your API key to version control.

## Local Development

For local development, create a `.env.local` file in the project root with your environment variables:

```env
GOOGLE_API_KEY=your_google_api_key_here
```

## Production Deployment

When deploying to production, ensure your environment variables are set securely through your hosting platform's environment variable configuration. Never hardcode API keys in your source code.

## Security Best Practices

- Never commit API keys to version control
- Use different API keys for development and production
- Regularly rotate your API keys
- Monitor your API usage and set appropriate quotas
- Restrict API key permissions to only what's necessary for the application