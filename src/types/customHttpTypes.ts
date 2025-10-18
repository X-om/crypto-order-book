import { Request, Response } from "express";

export interface ICustomRequest<TBody = any, TParams = any, TQuery = any> extends Request<TParams, any, TBody, TQuery> {
    userId?: string;
    remoteIpAddress?: string;
}

interface ICustomSuccessResponse<T = undefined> {
    success: true;
    message?: string;
    data?: Record<string, unknown> | T;
}

interface ICustomErrorResponse {
    success: false;
    error?: string;
    message?: string;
}

type ICustomResponse<T = undefined> = ICustomErrorResponse | ICustomSuccessResponse<T>;
export type IUnifiedResponse<T = undefined> = Response<ICustomResponse<T>>;


export interface IJwtPayload {
    userId: string;
    email: string;
}