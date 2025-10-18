import express from 'express';
import { verifyAuthMiddleware } from '../../middlewares/authMiddleware';
import { getAllCryptosController } from '../../controllers/crypto/cryptoFetchController';
const cryptoRouter = express.Router();

cryptoRouter.use(verifyAuthMiddleware);
cryptoRouter.get('/getAllCryptos', getAllCryptosController);
export default cryptoRouter;