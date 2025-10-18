import url from 'url';
import jwt from 'jsonwebtoken';
import { IncomingMessage } from 'http';
import { JWT_SECRET } from '../../env';
import { IJwtPayload } from '../../types/customHttpTypes';
import { ICustomWebSocket } from '../../types/customWsTypes';

export const handleWsAuth = (req: IncomingMessage, ws: ICustomWebSocket): { success: boolean, message?: string; } => {
    try {
        const parsedUrl = url.parse(req.url || '', true);
        const token = parsedUrl.query?.token as string | undefined;

        if (!token) return { success: false, message: "Token not provided" };
        const decoded = jwt.verify(token, JWT_SECRET) as IJwtPayload;

        ws.userId = decoded.userId;
        ws.email = decoded.email;
        return { success: true };

    } catch (err) {
        console.error(err);
        return { success: false, message: "Expired Token" };
    }

};