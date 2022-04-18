import { Injectable, Interceptor, InterceptorContext, Next, Body } from '@caviajs/core';
import { Observable } from 'rxjs';

declare module 'http' {
  export interface IncomingMessage {
    body: any | undefined;
  }
}

@Injectable()
export class BodyParseInterceptor implements Interceptor {
  constructor(
    protected readonly body: Body,
  ) {
  }

  public async intercept(ctx: InterceptorContext, next: Next): Promise<Observable<any>> {
    ctx.request.body = await this.body.parseBody(ctx.request);

    return next.handle();
  }
}
