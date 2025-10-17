import { Request, Response } from "express";

export interface ICustomRequest<TBody = undefined, TParams = undefined, TQuey = undefined> extends Request<TParams, undefined, TBody, TQuey> {
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