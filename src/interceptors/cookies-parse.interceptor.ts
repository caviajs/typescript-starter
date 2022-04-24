import { Cookies, Injectable, Interceptor, Next, Request, Response } from '@caviajs/core';
import { Observable } from 'rxjs';

declare module 'http' {
  export interface IncomingMessage {
    cookies: Record<string, string | string[]>;
  }
}

@Injectable()
export class CookiesParseInterceptor extends Interceptor {
  constructor(
    protected readonly cookies: Cookies,
  ) {
    super();
  }

  public async intercept(request: Request, response: Response, next: Next): Promise<Observable<any>> {
    request.cookies = await this.cookies.parseCookies(request);

    return next.handle();
  }
}
