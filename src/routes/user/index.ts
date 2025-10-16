import express from 'express';
import { handleGenerateOtpInputValidation, handleUserSignUpInputValidation } from '../../controllers/validations/userValidationHandler';
import { generateOtpController, userSignUpController } from '../../controllers/user/userOperationalController';
import { verifyAuthMiddleware } from '../../middlewares/auth/authMiddleware';

const userRouter = express.Router();

userRouter.post('/signup', handleUserSignUpInputValidation, userSignUpController);
userRouter.post('/generateOtp', handleGenerateOtpInputValidation, generateOtpController);

userRouter.use(verifyAuthMiddleware);



export default userRouter;