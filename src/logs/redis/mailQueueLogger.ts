import { Queue, Job } from 'bullmq';
import { REDIS_MAIL_QUEUE } from '../../constants/redisConstants';

export const mailQueueLogger = async (queue: Queue) => {
    try {
        const [waitingJobs, activeJobs, completedJobs, failedJobs, delayedJobs] = await Promise.all([
            queue.getWaiting(), queue.getActive(),
            queue.getCompleted(0, 49),
            queue.getFailed(), queue.getDelayed()
        ]);

        const formatJobData = (jobs: Job[], status: string) => {
            return jobs.slice(0, 10).map(job => ({
                id: job.id, name: job.name, status, data: job.data.to || 'N/A',
                subject: job.data.subject || 'N/A', attemptsMade: job.attemptsMade || 0,
                maxAttempts: job.opts?.attempts || 3, timestamp: new Date(job.timestamp).toISOString(),
                processedOn: job.processedOn ? new Date(job.processedOn).toISOString() : 'N/A',
                failedReason: job.failedReason || 'N/A'
            }));
        };
        console.log('%c🚀 BULLMQ MAIL QUEUE MONITOR 🚀', 'color: #00FFFF; font-size: 18px; font-weight: bold; text-shadow: 0 0 10px #00FFFF; background: #000; padding: 10px;');

        const totalWaiting = waitingJobs.length;
        const totalActive = activeJobs.length;
        const totalCompleted = completedJobs.length;
        const totalFailed = failedJobs.length;
        const totalDelayed = delayedJobs.length;

        console.log('%c📊 QUEUE STATISTICS', 'color: #00FFFF; font-size: 14px; font-weight: bold; text-shadow: 0 0 5px #00FFFF;');
        const stats = [
            { metric: 'Waiting', value: totalWaiting, color: '#FFD700' },
            { metric: 'Active', value: totalActive, color: '#00FF00' },
            { metric: 'Completed', value: totalCompleted, color: '#4169E1' },
            { metric: 'Failed', value: totalFailed, color: '#FF4500' },
            { metric: 'Delayed', value: totalDelayed, color: '#FF69B4' }
        ];

        console.table(stats.map(s => ({
            [s.metric]: s.value,
            Status: s.metric
        })), ['Status', 'Waiting', 'Active', 'Completed', 'Failed', 'Delayed']);

        if (waitingJobs.length > 0) {
            console.log('%c⏳ WAITING JOBS', 'color: #00FFFF; font-weight: bold;');
            console.table(formatJobData(waitingJobs, 'waiting'), ['id', 'name', 'status', 'data', 'subject', 'attemptsMade', 'timestamp']);
        }

        if (activeJobs.length > 0) {
            console.log('%c⚡ ACTIVE JOBS', 'color: #00FFFF; font-weight: bold;');
            console.table(formatJobData(activeJobs, 'active'), ['id', 'name', 'status', 'data', 'subject', 'attemptsMade', 'timestamp']);
        }

        if (failedJobs.length > 0) {
            console.log('%c❌ FAILED JOBS', 'color: #00FFFF; font-weight: bold;');
            console.table(formatJobData(failedJobs, 'failed'), ['id', 'name', 'status', 'data', 'failedReason', 'attemptsMade', 'timestamp']);
        }

        const allJobs = [...waitingJobs, ...activeJobs, ...completedJobs, ...failedJobs, ...delayedJobs];
        const jobNameCounts = allJobs.reduce((acc, job) => {
            const name = job.name || 'unknown';
            acc[name] = (acc[name] || 0) + 1;
            return acc;
        }, {} as Record<string, number>);

        console.log('%c📈 JOB TYPES BREAKDOWN', 'color: #00FFFF; font-weight: bold;');
        console.table(Object.entries(jobNameCounts).map(([name, count]) => ({
            JobType: name, Count: count,
            Percentage: `${((count / allJobs.length) * 100).toFixed(1)}%`
        })), ['JobType', 'Count', 'Percentage']);

        console.log('%c' + '═'.repeat(100), 'color: #00FFFF;');
        console.log('%c📧 Mail Queue Monitoring Complete | Queue: ' + REDIS_MAIL_QUEUE, 'color: #00FFFF; font-weight: bold; text-shadow: 0 0 5px #00FFFF;');
        console.log('%c' + '═'.repeat(100), 'color: #00FFFF;');

    } catch (error) {
        console.error('%c❌ Error fetching queue data:', 'color: #FF4500; font-weight: bold;', error);
    } finally {
        await queue.close();
    }
};
