import { Router } from 'express';
import quoteController from '../controllers/quoteController';
import cacheMiddleware from '../middlewares/cacheMiddleware';
import requestValidationMiddleware from '../middlewares/requestValidationMiddleware';

const router = Router();

router.get('/', requestValidationMiddleware, cacheMiddleware, quoteController.getQuote);

export default router;
