import nodemailer from 'nodemailer';
import { MAILER_PASS, MAILER_USER } from '../env';

const transporter = nodemailer.createTransport({
    host: 'gmail',
    auth: {
        user: MAILER_USER,
        pass: MAILER_PASS,
    }
});
export const sendMail = async (to: string, subject: string, html: string) => await transporter.sendMail({ from: MAILER_USER, to, subject, html });