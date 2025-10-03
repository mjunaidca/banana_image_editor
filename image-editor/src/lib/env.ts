import { z } from 'zod';

// Define the schema for environment variables
const envSchema = z.object({
  GOOGLE_API_KEY: z.string().min(1, 'Google API Key is required'),
});

// Validate environment variables
export const validateEnv = () => {
  try {
    const parsedEnv = envSchema.parse({
      GOOGLE_API_KEY: process.env.GOOGLE_API_KEY,
    });
    
    return {
      isValid: true,
      env: parsedEnv,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('Environment variable validation failed:', error.issues);
      return {
        isValid: false,
        error: error.issues,
      };
    }
    
    return {
      isValid: false,
      error: [error],
    };
  }
};

// Export validated environment variables
export const { env } = validateEnv();