import { REDIS_DATA_CLIENT, REDIS_MAIL_CLIENT, REDIS_PORT } from '../env';
import { IRedisConfig } from '../types/redisServices/redisConfigTypes';

// * REDIS CONFIGURATION
export const REDIS_DATA_CONFIG: IRedisConfig = {
    host: 'localhost',
    port: REDIS_PORT,
    db: REDIS_DATA_CLIENT,
    maxRetriesPerRequest: 5,
    reconnectOnError: (_err) => true,
};

export const REDIS_MAIL_CONFIG: IRedisConfig = {
    host: 'localhost',
    port: REDIS_PORT,
    db: REDIS_MAIL_CLIENT,
    maxRetriesPerRequest: 5,
    reconnectOnError: (_err) => true,
};

// * REDIS KEYS 
export const getRedisOTPKey = (email: string) => `otp:${email}`;
export const REDIS_OTP_ATTEMPT_PREFIX = (email: string) => `otp_attempts:${email}`;


// * REDIS EXPIRY TIMES IN SECONDS
export const REDIS_OTP_EXPIRY_SECONDS = 10 * 60;


// * REDIS QUEUE NAMES
export const REDIS_MAIL_QUEUE = 'mailQueue';



