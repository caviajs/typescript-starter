import { HttpCors } from '@caviajs/http-cors';
import { Interceptor } from '@caviajs/http-router';

export const HttpCorsInterceptor: Interceptor = HttpCors.setup({
  'Access-Control-Allow-Origin': 'https://caviajs.com',
  'Access-Control-Allow-Methods': ['GET'],
});
