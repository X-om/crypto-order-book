import { mailManager } from '../services/mailManager';

async function monitorQueue() {
    try { await mailManager.logMailStatus(); }
    catch (error) {
        console.error('Error monitoring mail queue:', error);
        process.exit(1);
    }
}
monitorQueue();