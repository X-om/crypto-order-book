import Redis from 'ioredis';
import { REDIS_DATA_CONFIG } from '../constants/redisConstants';

const redisClient = new Redis(REDIS_DATA_CONFIG);

redisClient.on('connect', () => console.info('Connected to Redis server'));
redisClient.on('error', (err) => console.error('Redis connection error:', err));

export default redisClient;
