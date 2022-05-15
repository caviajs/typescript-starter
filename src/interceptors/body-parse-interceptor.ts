import { HttpBodyParser } from '@caviajs/http-body-parser';
import { Interceptor, Next } from '@caviajs/http-router';
import { Observable } from 'rxjs';

declare module 'http' {
  export interface IncomingMessage {
    body: any | undefined;
  }
}

export const BodyParseInterceptor: Interceptor = async (request, response, next: Next): Promise<Observable<any>> => {
  if (['POST', 'PUT', 'PATCH', 'DELETE'].includes(request.method)) {
    request.body = await HttpBodyParser.parse(request, {});
  }

  return next.handle();
};
