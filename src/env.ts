import { config } from 'dotenv';
import { z } from 'zod';

config();

const envSchema = z.object({
    PORT: z.string().transform(Number),
    JWT_SECRET: z.string().min(1),
    BINANCE_CRYPTO_ORDER_BOOK_API_URL: z.string().url(),
    REDIS_PORT: z.string().transform(Number),
    REDIS_DATA_CLIENT: z.string().transform(Number),
    REDIS_MAIL_CLIENT: z.string().transform(Number),
    MAILER_USER: z.string().email().min(1),
    MAILER_PASS: z.string().min(1),
});

const env = envSchema.safeParse(process.env);

if (!env.success) {
    console.error('❌ Invalid environment variables:', env.error.format());
    throw new Error('Invalid environment variables');
}

export const { PORT, JWT_SECRET, BINANCE_CRYPTO_ORDER_BOOK_API_URL, REDIS_PORT, REDIS_DATA_CLIENT, REDIS_MAIL_CLIENT, MAILER_USER, MAILER_PASS } = env.data;