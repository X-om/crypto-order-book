import Redis from 'ioredis';
import { REDIS_MAIL_CONFIG } from '../constants/redisConstants';

const redisMailClient = new Redis(REDIS_MAIL_CONFIG);

redisMailClient.on('connect', () => console.info('Connected to Redis Mail client'));
redisMailClient.on('error', (err) => console.error('Redis Mail client connection error:', err));

export default redisMailClient;