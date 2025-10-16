import { config } from 'dotenv';
import { z } from 'zod';

// Load environment variables from .env file
config();

// Define environment variable schema
const envSchema = z.object({
    PORT: z.string().transform(Number),
    JWT_SECRET: z.string().min(1),
    BINANCE_CRYPTO_ORDER_BOOK_API_URL: z.string().url()
});

// Validate and transform environment variables
const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error('❌ Invalid environment variables:', env.error.format());
    throw new Error('Invalid environment variables');
}

// Export validated environment variables
export const { PORT, JWT_SECRET, BINANCE_CRYPTO_ORDER_BOOK_API_URL } = env.data;