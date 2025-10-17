import redisMailClient from '../connection/redisMailClient';
import { sendMail } from '../services/mailer';
import { IMailJob } from '../types/redisServices/bullmqTypes';
import { REDIS_MAIL_QUEUE } from './../constants/redisConstants';
import { Worker } from 'bullmq';

const mailWorker = new Worker(REDIS_MAIL_QUEUE, async (job) => {
    const { to, subject, html } = job.data as IMailJob;
    await sendMail(to, subject, html);
}, { connection: redisMailClient });

mailWorker.on('completed', (job) => console.info(`Mail job with id ${job.id} has been completed.`));
mailWorker.on('failed', (job, err) => console.error(`Mail job with id ${job?.id} has failed with error: ${err.message}`));

export default mailWorker;