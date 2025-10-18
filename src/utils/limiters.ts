import rateLimit from 'express-rate-limit';
import { MINUTES_IN_MILLISECONDS } from '../constants/timeConstants';

export const apiLimiter = rateLimit({
    windowMs: MINUTES_IN_MILLISECONDS * 1,
    max: 50,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many requests from this IP, please try again after a minute.'
});

export const verifyOTPLimiter = rateLimit({
    windowMs: MINUTES_IN_MILLISECONDS * 10,
    max: 5,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many OTP verification attempts, please try again after 10 minutes.'
});

export const generateOTPLimiter = rateLimit({
    windowMs: MINUTES_IN_MILLISECONDS * 10,
    max: 3,
    standardHeaders: true,
    legacyHeaders: false,
    message: 'Too many OTP generation requests, please try again after 10 minutes.'
});

