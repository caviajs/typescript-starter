import { Route } from '@caviajs/http-router';
import { z } from 'zod';
import { HttpException } from '@caviajs/http-exception';
import { HttpBody } from '@caviajs/http-body';

const BODY_SCHEMA = z
  .object({
    name: z.string(),
  })
  .strict();

export const GuineaPigCreateRoute: Route = {
  handler: async (request, response): Promise<any> => {
    let body: z.infer<typeof BODY_SCHEMA>;

    try {
      body = await BODY_SCHEMA.parseAsync(await HttpBody.parse(request, 'json'));
    } catch (error) {
      throw new HttpException(400, error);
    }

    // body...
  },
  method: 'POST',
  path: '/guinea-pigs',
};
