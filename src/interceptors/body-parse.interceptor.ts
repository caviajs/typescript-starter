import { Injectable, Interceptor, Next, Body, Request, Response } from '@caviajs/core';
import { Observable } from 'rxjs';

declare module 'http' {
  export interface IncomingMessage {
    body: any | undefined;
  }
}

@Injectable()
export class BodyParseInterceptor extends Interceptor {

  constructor(protected readonly body: Body) {
    super();
  }

  public async intercept(request: Request, response: Response, next: Next): Promise<Observable<any>> {
    request.body = await this.body.parseBody(request);

    return next.handle();
  }

}
