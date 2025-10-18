import { Request, Response } from "express";

export interface ICustomRequest<TBody = any, TParams = any, TQuery = any> extends Request<TParams, any, TBody, TQuery> {
    userId?: string;
    remoteIpAddress?: string;
}

interface ICustomSuccessResponse {
    success: true;
    message?: string;
    data?: Record<string, unknown>;
}

interface ICustomErrorResponse {
    success: false;
    error?: string;
    message?: string;
}

type ICustomResponse = ICustomErrorResponse | ICustomSuccessResponse;
export type IUnifiedResponse = Response<ICustomResponse>;


export interface IJwtPayload {
    userId: string;
    email: string;
}