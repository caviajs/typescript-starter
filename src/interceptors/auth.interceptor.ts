import { Injectable, Interceptor, Next, Request, Response } from '@caviajs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor extends Interceptor {

  public async intercept(request: Request, response: Response, next: Next): Promise<Observable<any>> {
    console.log('AuthInterceptor: ', request?.metadata?.data);

    return next.handle();
  }

}
