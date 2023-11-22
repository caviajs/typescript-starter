import { Interceptor } from '@caviajs/http-router';
import { HttpException } from '@caviajs/http-exception';
import { COMMON_HEADERS_SCHEMA } from '../schema';
import { z } from 'zod';

export const BootstrapInterceptor: Interceptor = (request, response, next) => {
  let headers: z.infer<typeof COMMON_HEADERS_SCHEMA> = request.headers as z.infer<typeof COMMON_HEADERS_SCHEMA>;

  try {
    if (request.method !== 'OPTIONS' && request.path !== '/swagger') {
      headers = COMMON_HEADERS_SCHEMA.parse(request.headers);
    }
  } catch (error) {
    throw error instanceof HttpException ? error : new HttpException(500, error as any);
  }

  return next.handle();
};

