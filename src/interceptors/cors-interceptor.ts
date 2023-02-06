import { HttpCors } from '@caviajs/http-cors';
import { Interceptor } from '@caviajs/http-router';

export const CorsInterceptor: Interceptor = (request, response, next) => {
  HttpCors.setup(request, response, {
    'Access-Control-Allow-Origin': 'http://localhost:4200',
    'Access-Control-Allow-Methods': ['DELETE', 'GET', 'HEAD', 'OPTIONS', 'PATCH', 'POST', 'PUT'],
    'Access-Control-Allow-Credentials': true,
  });

  return next.handle();
};
