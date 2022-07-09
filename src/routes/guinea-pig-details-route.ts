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
          id: { required: true, type: 'string' },
        },
      },
      responses: {
        200: {
          body: {
            properties: {
              id: { required: true, type: 'string' },
              name: { required: true, type: 'string' },
            },
            required: true,
            type: 'object',
          },
        },
      },
    },
  },
  method: 'GET',
  path: '/guinea-pigs/:id',
};
