import { HttpContract } from '@caviajs/http-contract';
import { Interceptor } from '@caviajs/http-router';

export const HttpContractInterceptor: Interceptor = HttpContract.setup();
