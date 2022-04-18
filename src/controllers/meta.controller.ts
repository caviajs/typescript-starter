import { Controller, HttpRouter, RouteMapping, Request, Response } from '@caviajs/core';

@Controller('_meta')
export class MetaController {
  constructor(
    protected readonly httpRouter: HttpRouter,
  ) {
  }

  @RouteMapping('GET', 'spec')
  public spec(request: Request, response: Response): any {
    return [
      {
        name: '',
        meta: {},
        method: '',
        path: '',
      },
    ];
  }
}
