import { Request, Response, NextFunction } from 'express';
import ExchangeCacheService from '../services/exchangeCacheService'
import { QueryStringParams, QuoteRequestHandler } from '../types/quoteRequestType';

const cacheService = ExchangeCacheService.getInstance();

/**
 * Checks cache for identical request. If found - returns cached data in response.
 */
const cacheMiddleware: QuoteRequestHandler = (req: Request<{},{},{},QueryStringParams>, res: Response, next: NextFunction) => {
    const {baseCurrency, quoteCurrency, baseAmount} = req.query;
    const baseAmountNumber = parseInt(baseAmount);
    const result = cacheService.get(baseCurrency, quoteCurrency, baseAmountNumber);
    result ? res.status(200).json(result) : next();
};

export default cacheMiddleware;
