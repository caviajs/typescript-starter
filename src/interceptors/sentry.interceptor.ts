import { Injectable, Interceptor, Logger, Next, Request, Response } from '@caviajs/core';
import { catchError, Observable, throwError } from 'rxjs';

@Injectable()
export class SentryInterceptor extends Interceptor {

  constructor(protected readonly logger: Logger) {
    super();
  }

  public async intercept(request: Request, response: Response, next: Next): Promise<Observable<any>> {
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
