import { userOtpLogger } from '../logs/redis/userOtpLogger';

const monitorOTPLogs = async () => {
    try {
        await userOtpLogger();
    } catch (error) {
        console.error('Error monitoring OTP logs:', error);
        process.exit(1);
    }
};

(async function startMonitoring() {
    const run = async () => { console.clear(); await monitorOTPLogs(); };
    await run();
    setInterval(() => { run().catch(err => { console.error('Monitoring failed:', err); }); }, 5000);
})();