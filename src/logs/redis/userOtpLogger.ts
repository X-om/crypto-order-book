import redisDataClient from '../../connection/redisDataClient';
import { REDIS_OTP_EXPIRY_SECONDS } from '../../constants/redisConstants';

export const userOtpLogger = async () => {
    try {
        const keys = await redisDataClient.keys('otp:*');
        const otpData = await Promise.all(keys.map(async (key: string) => {
            const otp = await redisDataClient.get(key);
            const ttl = await redisDataClient.ttl(key);
            const email = key.replace('otp:', '');
            return {
                email, otp, createdAt: new Date(Date.now() - (REDIS_OTP_EXPIRY_SECONDS - ttl) * 1000).toISOString(),
                expiresIn: `${ttl} seconds`
            };
        }));

        console.log('%c🔑 REDIS OTP LOGGER', 'color: #00FFFF; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px #00FFFF; background: #000; padding: 10px;');
        console.table(otpData, ['email', 'otp', 'createdAt', 'expiresIn']);

        console.log('%c' + '═'.repeat(100), 'color: #00FFFF;');
        console.log('%c✅ OTP Logging Complete', 'color: #00FFFF; font-weight: bold; text-shadow: 0 0 5px #00FFFF;');
        console.log('%c' + '═'.repeat(100), 'color: #00FFFF;');
    } catch (error) {
        console.error('%c❌ Error fetching OTP data:', 'color: #FF4500; font-weight: bold;', error);
    }
};