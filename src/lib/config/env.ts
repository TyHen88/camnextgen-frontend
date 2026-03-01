import { z } from 'zod';

const envSchema = z.object({
  NEXT_PUBLIC_API_URL: z.string().default('http://localhost:8181'),
  NEXT_PUBLIC_AUTH_TOKEN_MODE: z.enum(['cookie', 'json']).default('cookie'),
  NEXT_PUBLIC_ADMIN_BASE_URL: z.string().url().optional(),
  NEXT_PUBLIC_STUDENT_BASE_URL: z.string().url().optional()
});

const parsed = envSchema.safeParse({
  NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
  NEXT_PUBLIC_AUTH_TOKEN_MODE: process.env.NEXT_PUBLIC_AUTH_TOKEN_MODE,
  NEXT_PUBLIC_ADMIN_BASE_URL: process.env.NEXT_PUBLIC_ADMIN_BASE_URL,
  NEXT_PUBLIC_STUDENT_BASE_URL: process.env.NEXT_PUBLIC_STUDENT_BASE_URL
});

if (!parsed.success) {
  console.warn('Invalid env detected, falling back to defaults.');
}

export const env = parsed.success
  ? parsed.data
  : {
      NEXT_PUBLIC_API_URL: 'http://localhost:8181',
      NEXT_PUBLIC_AUTH_TOKEN_MODE: 'cookie'
    };
