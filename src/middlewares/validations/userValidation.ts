import { z } from 'zod';

export const userSignUpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" }),
    firstName: z.string(),
    lastName: z.string()
});
export type UserSignUpType = z.infer<typeof userSignUpSchema>;




export const generateOtpSchema = z.object({
    email: z.string().email({ message: "Invalid email address" })
})
export type GenerateOtpSchemaType = z.infer<typeof generateOtpSchema>;