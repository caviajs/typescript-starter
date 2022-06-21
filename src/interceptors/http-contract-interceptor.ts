import { HttpContract } from '@caviajs/http-contract';
import { Interceptor } from '@caviajs/http-router';

/**
 * The contract is responsible for parsing and validating the payload of the request.
 */
export const HttpContractInterceptor: Interceptor = HttpContract.setup();
