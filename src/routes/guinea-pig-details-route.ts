import { Route } from '@caviajs/http-router';
import { z } from 'zod';
import { HttpException } from '@caviajs/http-exception';

const PARAMS_SCHEMA = z
  .object({
    id: z.string(),
  })
  .strict();

export const GuineaPigDetailsRoute: Route = {
  handler: async (request, response): Promise<any> => {
    let params: z.infer<typeof PARAMS_SCHEMA>;

    try {
      params = await PARAMS_SCHEMA.parseAsync(request.params);
    } catch (error) {
      throw new HttpException(400, error);
    }

    // params...

    return { id: params.id, name: 'Cavia' };
  },
  method: 'GET',
  path: '/guinea-pigs/:id',
};
