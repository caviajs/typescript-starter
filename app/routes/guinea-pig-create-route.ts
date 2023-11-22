import { Route } from '@caviajs/http-router';
import { z } from 'zod';
import { HttpParser } from '../providers/http-parser';

const REQUEST_BODY_SCHEMA = z
  .object({
    name: z.string(),
  })
  .strict();

export const GuineaPigCreateRoute: Route = {
  handler: async (request, response): Promise<void> => {
    const body = await HttpParser
      .requestBody(request, REQUEST_BODY_SCHEMA, 'json');

    // body.name
    // ...

    response.statusCode = 201;
  },
  metadata: {
    swagger: {
      request: {
        body: {
          content: {
            'application/json': {
              schema: REQUEST_BODY_SCHEMA,
            },
          },
          required: true,
        },
      },
      responses: {
        '201': {
          description: '',
        },
        '400': {
          description: '',
        },
        '500': {
          description: '',
        },
      },
      tags: ['App'],
    },
  },
  method: 'POST',
  path: '/guinea-pigs',
};
