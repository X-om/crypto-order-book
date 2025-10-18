import { NextFunction } from "express";
import { generateOTPSchema, GenerateOtpSchemaType, userSignUpSchema, UserSignUpType, verifyOTPSchema, VerifyOtpSchemaType } from "../../types/zod/userInputValidationSchemas";
import { ICustomRequest, IUnifiedResponse } from "../../types/customHttpTypes";

const handleUserSignUpInputValidation = (req: ICustomRequest<UserSignUpType>, res: IUnifiedResponse, next: NextFunction): void => {
    try {
        const response = userSignUpSchema.safeParse(req.body);
        if (!response.success)
            return void res.status(422).json({ success: false, message: response.error.issues.map(err => `path: ${err.path.join('.')} | message: ${err.message}`).join(',') });
        return next();
    } catch (err) {
        console.error(err);
        return void res.status(500).json({ success: false, error: "Internal server error" });
    }
};

const handleGenerateOtpInputValidation = (req: ICustomRequest<GenerateOtpSchemaType>, res: IUnifiedResponse, next: NextFunction): void => {
    try {
        const response = generateOTPSchema.safeParse(req.body);
        if (!response.success)
            return void res.status(422).json({ success: false, message: response.error.issues.map(err => err.message).join(',') });
        return next();
    } catch (err) {
        console.error(err);
        return void res.status(500).json({ success: false, error: "Internal server error" });
    }
};

const handleVerifyOTPInputValidation = (req: ICustomRequest<VerifyOtpSchemaType>, res: IUnifiedResponse, next: NextFunction): void => {
    try {
        const response = verifyOTPSchema.safeParse(req.body);
        if (!response.success)
            return void res.status(422).json({ success: false, message: response.error.issues.map(err => err.message).join(',') });
        return next();
    } catch (err) {
        console.error(err);
        return void res.status(500).json({ success: false, error: "Internal server error" });
    }
};
export { handleUserSignUpInputValidation, handleGenerateOtpInputValidation, handleVerifyOTPInputValidation }; 