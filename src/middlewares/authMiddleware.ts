import { NextFunction } from "express";
import jwt from "jsonwebtoken";
import { ICustomRequest, IUnifiedResponse } from "../types/customHttpTypes";
import { JWT_SECRET } from "../env";

export const verifyAuthMiddleware = (req: ICustomRequest, res: IUnifiedResponse, next: NextFunction): void => {
    try {
        const token = req.cookies?.token;
        if (!token) return void res.status(403).json({ success: false, message: "Unauthorized user!, token not found" });

        const decoded = jwt.verify(token, JWT_SECRET) as { userId: string; };
        req.userId = decoded.userId;
        return next();
    } catch (err) {
        console.error(err);
        return void res.status(403).json({ success: false, error: "Invalid Token !" });
    }
};

