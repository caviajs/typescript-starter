import { HttpException, Injectable, Interceptor, InterceptorContext, Next, Validator } from '@caviajs/core';
import { Observable } from 'rxjs';

@Injectable()
export class ValidatorInterceptor implements Interceptor {
  constructor(
    protected readonly validator: Validator,
  ) {
  }

  public async intercept(ctx: InterceptorContext, next: Next): Promise<Observable<any>> {
    const meta = ctx.request.meta;

    const validationErrors = {
      body: meta.request?.body ? await this.validator.validate(meta.request?.body, ctx.request.body) : [],
      cookies: meta.request?.cookies ? await this.validator.validate(meta.request?.cookies, ctx.request.cookies) : [],
      headers: meta.request?.headers ? await this.validator.validate(meta.request?.headers, ctx.request.headers) : [],
      params: meta.request?.params ? await this.validator.validate(meta.request?.params, ctx.request.params) : [],
      query: meta.request?.query ? await this.validator.validate(meta.request?.query, ctx.request.query) : [],
    };

    if (Object.values(validationErrors).some(it => it.length > 0)) {
      throw new HttpException(400, validationErrors);
    }

    return next.handle();
  }
}
