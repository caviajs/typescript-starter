import { Injectable, Interceptor, InterceptorContext, Next, Url } from '@caviajs/core';
import { Observable } from 'rxjs';

declare module 'http' {
  export interface IncomingMessage {
    query: Record<string, string | string[]>;
  }
}

@Injectable()
export class QueryParseInterceptor implements Interceptor {
  constructor(
    protected readonly url: Url,
  ) {
  }

  public async intercept(ctx: InterceptorContext, next: Next): Promise<Observable<any>> {
    ctx.request.query = await this.url.query(ctx.request.url);

    return next.handle();
  }
}
