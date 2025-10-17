import { Queue } from 'bullmq';
import Redis from 'ioredis';
import { REDIS_MAIL_QUEUE } from '../constants/redisConstants';
import { getLogInOtpMailTemplate } from '../templates/logInOtpMailTemplate';
import redisMailClient from '../connection/redisMailClient';
import { LOG_IN_OTP_MAIL_KEY } from '../constants/mailConstants';
import { ISendOtpMailProps } from '../types/mailTypes/mailProps';
import { mailQueueLogger } from '../logs/redis/mailQueueLogger';


class MailManager {
    private static instance: MailManager;
    private queue: Queue;

    private constructor(mailClient: Redis) {
        this.queue = new Queue(REDIS_MAIL_QUEUE, { connection: mailClient });
    }

    public static getInstance(mailClient: Redis): MailManager {
        if (!MailManager.instance) {
            MailManager.instance = new MailManager(mailClient);
        }
        return MailManager.instance;
    }

    public async logMailStatus() {
        await mailQueueLogger(this.queue);
    }

    public async sendLogInOtpMail({ to, subject, firstName, otp }: ISendOtpMailProps): Promise<void> {
        const mailTemplate = getLogInOtpMailTemplate(firstName, otp);
        const job = await this.queue.add(LOG_IN_OTP_MAIL_KEY, { to, subject, mailTemplate },
            { removeOnComplete: true, removeOnFail: 50, attempts: 3, backoff: { type: 'exponential', delay: 5000 } });

        console.info(`Enqueued LogIn OTP mail job with id ${job.id} for recipient ${to}.`);
    }
}

export const mailManager = MailManager.getInstance(redisMailClient);