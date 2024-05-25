import { Request, Response, NextFunction } from 'express';
import validationService from '../services/validationService'
import quoteSchema from '../schemas/quoteSchema.json'
import { QueryStringParams, QuoteRequestHandler } from '../types/quoteRequestType';

/**
 * Validates request query parameters based on schema provided.
 */
const requestValidationMiddleware: QuoteRequestHandler = (req: Request<{}, {}, {}, QueryStringParams>, res: Response, next: NextFunction) => {
    const validationResult = validationService.validate(req.query, quoteSchema);
    const {baseAmount} = req.query;

    const baseAmountNumber = parseInt(baseAmount);

    if (isNaN(baseAmountNumber) || baseAmountNumber <= 0) {
        res.status(400).json({ error: 'Invalid baseAmount. It must be a positive number.' });
        return;
    };
    console.log('validationResult: ', validationResult)
    validationResult.valid ? next() : res.status(400).json({ message: 'Validation Error', errors: validationResult.errors });
};

export default requestValidationMiddleware;
