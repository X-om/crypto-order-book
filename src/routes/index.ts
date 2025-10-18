import express from 'express';
import userRouter from './user';
import cryptoRouter from './crypto';

const router = express.Router();

router.use('/user', userRouter);
router.use('/crypto', cryptoRouter);


export default router; 