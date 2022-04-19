import { Injectable, Interceptor, InterceptorContext, Next } from '@caviajs/core';
import { Observable } from 'rxjs';

@Injectable()
export class AuthInterceptor implements Interceptor {
  public async intercept(context: InterceptorContext, next: Next): Promise<Observable<any>> {
    console.log('AuthInterceptor: ', context.args);

    return next.handle();
  }
}
