import { Injectable, Interceptor, Request, Response, Next, Logger } from '@caviajs/core';
import { Observable } from 'rxjs';

@Injectable()
export class LoggerInterceptor extends Interceptor {

  constructor(protected readonly logger: Logger) {
    super();
  }

  public async intercept(request: Request, response: Response, next: Next): Promise<Observable<any>> {
    // this.logger.debug(`Incoming {${ request.method } ${ request.url }} HTTP request`);

    return next.handle();
  }

}
