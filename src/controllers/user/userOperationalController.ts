import redisDataClient from '../../connection/redisDataClient';
import { prisma } from '../../connection/dbClient';
import { ICustomRequest, IUnifiedResponse } from '../../types/customHttpTypes';
import { GenerateOtpSchemaType, UserSignUpType } from '../../middlewares/validations/userValidation';
import { getRedisOTPKey, REDIS_OTP_EXPIRY_SECONDS } from '../../constants/redisConstants';
import { mailManager } from '../../services/mailManager';
import { LOG_IN_OTP_MAIL_SUBJECT } from '../../constants/mailConstants';

const userSignUpController = async (req: ICustomRequest<UserSignUpType>, res: IUnifiedResponse): Promise<void> => {
    try {
        const { email, firstName, lastName } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (user) return void res.status(409).json({ success: false, message: "User with this email already exists !" });
        await prisma.user.create({ data: { email, firstName, lastName } });

        return void res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return void res.status(500).json({ success: false, error: "Internal server error" });
    }
};

const generateLogInOtpController = async (req: ICustomRequest<GenerateOtpSchemaType>, res: IUnifiedResponse): Promise<void> => {
    try {
        const { body: { email } } = req;

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return void res.status(404).json({ success: false, message: "User Not Found" });
        const otp = String(Math.floor(Math.random() * 1e6)).padStart(6, '0');

        await Promise.all([
            prisma.otp.create({ data: { userId: user.id, email, action: 'CREATE', type: 'LOGIN', ip_address: req.remoteIpAddress, expiresAt: new Date(Date.now() + REDIS_OTP_EXPIRY_SECONDS * 1000) } }),
            redisDataClient.set(getRedisOTPKey(email), otp, 'EX', REDIS_OTP_EXPIRY_SECONDS),
            mailManager.sendLogInOtpMail({ to: email, subject: LOG_IN_OTP_MAIL_SUBJECT, firstName: user.firstName, otp })
        ]);

        return void res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return void res.status(500).json({ success: false, error: "Internal server error" });
    }
};


export { userSignUpController, generateLogInOtpController };    