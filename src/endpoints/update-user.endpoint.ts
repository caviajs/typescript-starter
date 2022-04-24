import { Request, Response, Injectable, Endpoint, EndpointMetadata } from '@caviajs/core';

@Injectable()
export class UpdateUserEndpoint extends Endpoint {

  public readonly metadata: EndpointMetadata = {
    data: {
      permissions: 'users:update',
    },
    method: 'PUT',
    path: '/users/:id',
    schema: {
      request: {
        body: {
          type: 'string',
          required: true,
        },
        headers: {
          members: {
            'X-Test': {
              type: 'string',
              required: true,
            },
          },
          type: 'object',
        },
      },
    },
  };

  public async handle(request: Request, response: Response): Promise<string> {
    console.log('updateUser handler');

    return 'Hellou';
  }

}
