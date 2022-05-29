import { Observable } from 'rxjs';
import { HttpException } from '@caviajs/http-exception';
import { Interceptor, Next } from '@caviajs/http-router';

export const ValidatorInterceptor: Interceptor = (request, response, next: Next): Observable<any> => {
  const metadata = request.metadata;

  // const error: ValidationError[] = [];
  //
  // if (metadata?.schema?.request?.body) {
  //   error.push(...Validator.validate(metadata?.schema?.request?.body, request.body, ['request', 'body']));
  // }
  //
  // if (metadata?.schema?.request?.headers) {
  //   error.push(...Validator.validate(metadata?.schema?.request?.headers, request.headers, ['request', 'headers']));
  // }
  //
  // if (metadata?.schema?.request?.params) {
  //   error.push(...Validator.validate(metadata?.schema?.request?.params, request.params, ['request', 'params']));
  // }
  //
  // if (metadata?.schema?.request?.query) {
  //   error.push(...Validator.validate(metadata?.schema?.request?.query, request.query, ['request', 'query']));
  // }
  //
  // if (error.length > 0) {
  //   throw new HttpException(400, error);
  // }

  return next.handle();
};
