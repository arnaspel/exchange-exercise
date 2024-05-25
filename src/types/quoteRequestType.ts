import { RequestHandler } from "express";

export interface QueryStringParams {
    baseCurrency: string;
    quoteCurrency: string;
    baseAmount: string;
}

export interface QuoteRequestHandler extends RequestHandler<{}, {}, {}, QueryStringParams> {}
