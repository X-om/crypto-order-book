import { Response, NextFunction } from 'express';
import { ICustomRequest } from '../types/customHttpTypes';

export const extractIpMiddleware = (req: ICustomRequest, _res: Response, next: NextFunction): void => {
    const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress;
    req.remoteIpAddress = Array.isArray(ip) ? ip[0] : ip || '';
    next();
};