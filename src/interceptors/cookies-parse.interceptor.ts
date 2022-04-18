import { Cookies, Injectable, Interceptor, InterceptorContext, Next } from '@caviajs/core';
import { Observable } from 'rxjs';

declare module 'http' {
  export interface IncomingMessage {
    cookies: Record<string, string | string[]>;
  }
}

@Injectable()
export class CookiesParseInterceptor implements Interceptor {
  constructor(
    protected readonly cookies: Cookies,
  ) {
  }

  public async intercept(ctx: InterceptorContext, next: Next): Promise<Observable<any>> {
    ctx.request.cookies = await this.cookies.parseCookies(ctx.request);

    return next.handle();
  }
}
