import { Injectable, Interceptor, InterceptorContext, Next } from '@caviajs/core';
import { Observable } from 'rxjs';
import { parse } from 'url';

declare module 'http' {
  export interface IncomingMessage {
    query: Record<string, string | string[]>;
  }
}

@Injectable()
export class QueryParseInterceptor implements Interceptor {
  public async intercept(ctx: InterceptorContext, next: Next): Promise<Observable<any>> {
    ctx.request.query = parse(ctx.request.url, true).query;

    return next.handle();
  }
}
