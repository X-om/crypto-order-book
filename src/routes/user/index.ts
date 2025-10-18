import express from 'express';
import { handleGenerateOtpInputValidation, handleUserSignUpInputValidation, handleVerifyOTPInputValidation } from '../../middlewares/validations/userValidationHandler';
import { generateLogInOtpController, userSignUpController, verifyLogInOtpController } from '../../controllers/user/userOperationalController';
import { generateOTPLimiter, verifyOTPLimiter } from '../../utils/limiters';
import { verifyAuthMiddleware } from '../../middlewares/authMiddleware';

const userRouter = express.Router();

userRouter.post('/signup', handleUserSignUpInputValidation, userSignUpController);
userRouter.post('/generateLogInOtp', generateOTPLimiter, handleGenerateOtpInputValidation, generateLogInOtpController);
userRouter.post('/verifyLogInOtp', verifyOTPLimiter, handleVerifyOTPInputValidation, verifyLogInOtpController);

userRouter.use(verifyAuthMiddleware);




export default userRouter;