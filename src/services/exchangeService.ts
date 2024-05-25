import axios from 'axios';
import ExternalServiceError from '../utils/customError';

/**
 * Calls external service to retrieve exchange data.
 */
const getQuote = async (baseCurrency: string, quoteCurrency: string, baseAmount: number) => {

    const response = await axios.get(process.env.EXCHANGE_SERVICE_URL + baseCurrency);

    if (response.status !== 200) {
        throw new ExternalServiceError('External service returned non 200 status code!', response.status, response.data);
    }

    return {
        amount: baseAmount * response.data.conversion_rates[quoteCurrency],
        rate: response.data.conversion_rates[quoteCurrency]
    }

};

export default { getQuote };
