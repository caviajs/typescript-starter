import { Route } from '@caviajs/http-router';

export const GuineaPigCreateRoute: Route = {
  handler: async (request, response): Promise<any> => {
    return { id: '1245' };
  },
  metadata: {
    contract: {
      name: 'guineaPigCreate',
      request: {
        body: {
          'application/json': { required: true, type: 'object' },
        },
      },
      responses: {
        200: {
          body: {
            properties: {
              id: { required: true, type: 'string' },
            },
            required: true,
            type: 'object',
          },
        },
        409: {},
      },
    },
  },
  method: 'POST',
  path: '/guinea-pigs',
};
