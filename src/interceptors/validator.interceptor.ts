import { HttpException, Injectable, Interceptor, Request, Response, Next, Validator } from '@caviajs/core';
import { Observable } from 'rxjs';

@Injectable()
export class ValidatorInterceptor extends Interceptor {

  constructor(protected readonly validator: Validator) {
    super();
  }

  public async intercept(request: Request, response: Response, next: Next): Promise<Observable<any>> {
    const schema = request?.metadata?.schema;

    const validationErrors = [
      ...schema?.request?.body ? await this.validator.validate(schema?.request?.body, request.body, ['request', 'body']) : [],
      ...schema?.request?.cookies ? await this.validator.validate(schema?.request?.cookies, request.cookies, ['request', 'cookies']) : [],
      ...schema?.request?.headers ? await this.validator.validate(schema?.request?.headers, request.headers, ['request', 'headers']) : [],
      ...schema?.request?.params ? await this.validator.validate(schema?.request?.params, request.params, ['request', 'params']) : [],
      ...schema?.request?.query ? await this.validator.validate(schema?.request?.query, request.query, ['request', 'query']) : [],
    ];

    if (validationErrors.length > 0) {
      throw new HttpException(400, validationErrors);
    }

    return next.handle();
  }

}
