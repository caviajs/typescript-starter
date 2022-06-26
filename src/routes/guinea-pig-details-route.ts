import { Route } from '@caviajs/http-router';

export const GuineaPigDetailsRoute: Route = {
  handler: async (request, response): Promise<any> => {
    return { id: request.params.id, name: 'Cavia' };
  },
  metadata: {
    contract: {
      name: 'guineaPigDetails',
      request: {
        params: {
          id: {
            type: 'string',
          },
        },
      },
      responses: {
        200: {
          body: {
            properties: {
              id: { type: 'string' },
              name: { type: 'string' },
            },
            type: 'object',
          }
        },
      },
    },
  },
  method: 'GET',
  path: '/guinea-pigs/:id',
};
