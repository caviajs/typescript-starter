import { Injectable, Interceptor, Next, Request, Response } from '@caviajs/core';
import { Observable } from 'rxjs';
import { parse } from 'url';

declare module 'http' {
  export interface IncomingMessage {
    query: Record<string, string | string[]>;
  }
}

@Injectable()
export class QueryParseInterceptor extends Interceptor {
  public async intercept(request: Request, response: Response, next: Next): Promise<Observable<any>> {
    request.query = parse(request.url, true).query;

    return next.handle();
  }
}
