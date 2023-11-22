import { HttpCors } from '@caviajs/http-cors';
import { Interceptor } from '@caviajs/http-router';
import { config } from '../config';

export const CorsInterceptor: Interceptor = HttpCors.setup(request => {
  const ALLOWED_ORIGINS: string[] = [
    'https://app.example-test.com',
    'https://app.example.com',
  ];

  let origin: string | undefined;

  switch (config.env) {
    case 'local':
      origin = request.headers.origin;
      break;
    case 'test':
    case 'prod':
    default:
      origin = ALLOWED_ORIGINS.includes(request.headers.origin!) ? request.headers.origin : undefined;
      break;
  }

  return {
    'Access-Control-Allow-Origin': origin,
    'Access-Control-Allow-Credentials': true,
    'Access-Control-Allow-Methods': ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT'],
    "Access-Control-Expose-Headers": ['x-request-id'],
  };
});
