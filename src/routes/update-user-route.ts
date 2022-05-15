import { Route } from '@caviajs/http-router';

export const UpdateUserRoute: Route = {
  handler: async (request, response): Promise<string> => {
    return 'Hello Cavia';
  },
  method: 'PUT',
  path: '/users/:id',
};
