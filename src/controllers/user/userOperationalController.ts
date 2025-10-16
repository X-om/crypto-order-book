import { prisma } from '../../connection/dbClient';
import { JWT_SECRET } from '../../env';
import { ICustomRequest, IUnifiedResponse } from '../../types/customHttpTypes';
import { GenerateOtpSchemaType, UserSignUpType } from '../../middlewares/validations/userValidation';
import jwt from 'jsonwebtoken'

const userSignUpController = async (req: ICustomRequest<UserSignUpType>, res: IUnifiedResponse): Promise<void> => {
    try {
        const { email, firstName, lastName } = req.body;
        const user = await prisma.user.findUnique({ where: { email } });

        if (user) return void res.status(409).json({ success: false, message: "User with this email already exists !" });

        const newUser = await prisma.user.create({ data: { email, firstName, lastName } })
        const token = jwt.sign({ id: newUser.id }, JWT_SECRET);

        res.cookie("token", token, { httpOnly: true, sameSite: 'lax', maxAge: 60 * 60 * 1000, path: '/' })
        return void res.status(200).json({ success: true });
    } catch (err) {
        console.error(err);
        return void res.status(500).json({ success: false, error: "Internal server error" });
    }
};

const generateOtpController = async (req: ICustomRequest<GenerateOtpSchemaType>, res: IUnifiedResponse): Promise<void> => {
    try {
        const { userId, body: { email } } = req;
        if (userId === undefined) return void res.status(403).json({ success: false, message: "Unauthorized user" });

        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) return void res.status(404).json({ success: false, message: "User Not Found" });

        const otp = String(Math.floor(Math.random() * 1e6)).padStart(6, '0');
        await Promise.all([
            prisma.otp.upsert({ where: { userId: userId }, update: { otp }, create: { userId, otp } }),
            // TODO : send otp to mail here
        ])

    } catch (err) {
        console.error(err);
        return void res.status(500).json({ success: false, error: "Internal server error" });
    }
}


export { userSignUpController, generateOtpController };    