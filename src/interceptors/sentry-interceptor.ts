import { catchError, Observable, throwError } from 'rxjs';
import { Interceptor, Next } from '@caviajs/http-router';
import { Logger } from '@caviajs/logger';

export const SentryInterceptor: Interceptor = (request, response, next: Next): Observable<any> => {
  return next
    .handle()
    .pipe(
      catchError((error) => {
        Logger.warn('Catching error...');

        return throwError(error);
      }),
    );
};
