import crypto from 'crypto';
import { Result } from '../types/resultType';

/**
 * LRU cache service for storing exchange calculations results.
 */
class ExchangeCacheService {

    private static instance: ExchangeCacheService;
    private firstKey: string | null;
    private hashMap: Map<any, any>;
    private cacheSize: number;

    constructor() {
        this.hashMap = new Map();
        this.cacheSize = parseInt(process.env.CACHE_SIZE || '5', 10);
        this.firstKey = null;
    }

    static getInstance() {
        if (!ExchangeCacheService.instance) {
            ExchangeCacheService.instance = new ExchangeCacheService();
        }
        return ExchangeCacheService.instance;
    }

    /**
     * Get cached value based on query parameters.
     */
    get(baseCurrency: string, quoteCurrency: string, baseAmount: number) {
        const key = this.hashKey(baseCurrency + quoteCurrency + baseAmount);
        if (this.hashMap.has(key)) {
            const value = this.hashMap.get(key);
            this.hashMap.delete(key);
            if (this.firstKey === key) this.updateFirstEntry();
            this.hashMap.set(key, value);
            return value;
        }
        return null;
    }

    /**
     * Set calculated result to cache.
     */
    set(baseCurrency: string, quoteCurrency: string, baseAmount: number, result: Result) {
        const key = this.hashKey(baseCurrency + quoteCurrency + baseAmount);
        if (this.hashMap.size === 0) {
            this.firstKey = key;
            this.hashMap.set(key, result);
        } else if (this.hashMap.size === this.cacheSize) {
            this.hashMap.delete(this.firstKey);
            this.hashMap.set(key, result);
            this.updateFirstEntry();
        } else {
            this.hashMap.set(key, result);
        }
    }

    private updateFirstEntry() {
        this.firstKey = this.hashMap.keys().next().value;
    }

    private hashKey(keyString: string) {
        const hash: crypto.Hash = crypto.createHash('sha256');
        hash.update(keyString);
        return hash.digest('hex');
    }
}

export default ExchangeCacheService;
