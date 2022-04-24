import { Request, Response, Injectable, Endpoint, EndpointMetadata, HttpException, HttpServerRegistry } from '@caviajs/core';

@Injectable()
export class ApiSpecEndpoint extends Endpoint {

  public readonly metadata: EndpointMetadata = {
    method: 'GET',
    path: '/api-spec',
  };

  constructor(protected readonly httpServerRegistry: HttpServerRegistry) {
    super();
  }

  public async handle(request: Request, response: Response): Promise<EndpointMetadata[]> {
    return this.httpServerRegistry.metadata;
  }

}
