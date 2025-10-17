import Redis from 'ioredis';
import { REDIS_DATA_CONFIG } from '../constants/redisConstants';

const redisDataClient = new Redis(REDIS_DATA_CONFIG);

redisDataClient.on('connect', () => console.info('Redis data client connected successfully.'));
redisDataClient.on('error', (err) => console.error('Redis data client connection error:', err));

export default redisDataClient;
