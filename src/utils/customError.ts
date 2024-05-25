import { exchangeError } from "../types/exchangeErrorType";

/**
 * External service error constructor.
 */
class ExternalServiceError extends Error {
    status: number;
    body: exchangeError;

    constructor(message: string, status: number, body: exchangeError) {
        super(message);
        this.name = "ExternalServiceError";
        this.status = status;
        this.body = body;

        Object.setPrototypeOf(this, ExternalServiceError.prototype);
    }
}
export default ExternalServiceError;
