import { z } from 'zod';

export const userSignUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    firstName: z.string(),
    lastName: z.string()
});
export type UserSignUpType = z.infer<typeof userSignUpSchema>;


export const generateOTPSchema = z.object({
    email: z.string().email({ message: "Invalid email address" })
});
export type GenerateOtpSchemaType = z.infer<typeof generateOTPSchema>;


export const verifyOTPSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    otp: z.string().length(6, { message: "OTP must be 6 characters long" }).refine((val) => /^\d{6}$/.test(val), { message: "OTP must contain only digits" })
});
export type VerifyOtpSchemaType = z.infer<typeof verifyOTPSchema>;