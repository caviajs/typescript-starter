import { Request, Response, Injectable, Endpoint, EndpointMetadata } from '@caviajs/core';

@Injectable()
export class CreateUserEndpoint extends Endpoint {

  public readonly metadata: EndpointMetadata = {
    data: {
      permissions: 'users:create',
    },
    method: 'POST',
    path: '/users',
    schema: {
      request: {
        body: {
          members: {},
          type: 'object',
        },
      },
    },
  };

  public async handle(request: Request, response: Response): Promise<string> {
    console.log('createUser handler');

    return 'Hello World';
  }

}
