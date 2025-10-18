import { prisma } from '../connection/dbClient';
import jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../env';

export const generateToken = async (email: string) => {
    try {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user) throw new Error('User not found');

        const tokenPayload = { userId: user.id, email: user.email };
        const token = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: '1h' });
        return token;
    } catch (err) {
        console.error('Error generating token:', err); throw err;
    }
};