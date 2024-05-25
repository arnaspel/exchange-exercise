import { Request, Response } from 'express';
import exchangeService from '../services/exchangeService';
import ExchangeCacheService from '../services/exchangeCacheService';
import { QueryStringParams, QuoteRequestHandler } from '../types/quoteRequestType';
import ExternalServiceError from '../utils/customError';


const cacheService = ExchangeCacheService.getInstance();

/**
 * Retrieves exchange data from service and calculates amount, sends result in response.
 */
const getQuote: QuoteRequestHandler = async (req: Request<{}, {}, {}, QueryStringParams>, res: Response) => {
  try {
    const { baseCurrency, quoteCurrency, baseAmount } = req.query;
    const baseAmountNumber = parseInt(baseAmount);

    const quote = await exchangeService.getQuote(baseCurrency, quoteCurrency, baseAmountNumber);

    const result = {
      exchangeRate: Math.round(quote.rate * 1000) / 1000,
      quoteAmount: Math.round(quote.amount * 100) / 100
    };

    res.status(200).json(result);
    cacheService.set(baseCurrency, quoteCurrency, baseAmountNumber, result);
  } catch (error: unknown) {
    if (error instanceof ExternalServiceError) {
      console.error('Error occurred: ', error);
      res.status(500).json({message: error.message, data: error.body, status: error.status });
    } else {
      console.error('An unexpected error occurred:', error);
      res.status(500).json({ message: 'An unexpected error occurred' });
    }
  }
};

export default { getQuote };
