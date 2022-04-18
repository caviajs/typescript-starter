import { Injectable, Interceptor, InterceptorContext, Logger, Next } from '@caviajs/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class SentryInterceptor implements Interceptor {
  constructor(
    protected readonly logger: Logger,
  ) {
  }

  public async intercept(ctx: InterceptorContext, next: Next): Promise<Observable<any>> {
    return next
      .handle()
      .pipe(
        catchError((error) => {
          this.logger.warn('Catching error...', 'SentryInterceptor');

          return throwError(error);
        }),
      );
  }
}
