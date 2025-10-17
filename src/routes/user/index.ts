import express from 'express';
import { handleGenerateOtpInputValidation, handleUserSignUpInputValidation } from '../../controllers/validations/userValidationHandler';
import { generateLogInOtpController, userSignUpController } from '../../controllers/user/userOperationalController';

const userRouter = express.Router();

userRouter.post('/signup', handleUserSignUpInputValidation, userSignUpController);
userRouter.post('/generateLogInOtp', handleGenerateOtpInputValidation, generateLogInOtpController);

// userRouter.use(verifyAuthMiddleware);



export default userRouter;