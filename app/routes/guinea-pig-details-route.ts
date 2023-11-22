import { Route } from '@caviajs/http-router';
import { z } from 'zod';
import { HttpParser } from '../providers/http-parser';

const REQUEST_PARAMS_SCHEMA = z
  .object({
    id: z.string(),
  })
  .strict();

const RESPONSE_BODY_SCHEMA_200 = z
  .object({
    data: z
      .object({
        id: z.string(),
        name: z.string(),
      })
      .strict(),
  })
  .strict();

export const GuineaPigDetailsRoute: Route = {
  handler: async (request, response): Promise<z.infer<typeof RESPONSE_BODY_SCHEMA_200>> => {
    const params = await HttpParser
      .requestParams(request, REQUEST_PARAMS_SCHEMA);

    // params.id 
    // ...

    return await HttpParser.responseBody(request, RESPONSE_BODY_SCHEMA_200, {
      data: {
        id: params.id,
        name: 'Cavia',
      },
    });
  },
  metadata: {
    swagger: {
      request: {
        params: REQUEST_PARAMS_SCHEMA,
      },
      responses: {
        '200': {
          description: '',
          content: {
            'application/json': {
              schema: RESPONSE_BODY_SCHEMA_200,
            },
          },
        },
        '404': {
          description: '',
        },
        '500': {
          description: '',
        },
      },
      tags: ['App'],
    },
  },
  method: 'GET',
  path: '/guinea-pigs/:id',
};
