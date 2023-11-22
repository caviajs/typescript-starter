import { Route } from '@caviajs/http-router';
import { z } from 'zod';
import { HttpParser } from '../providers/http-parser';

const REQUEST_BODY_SCHEMA = z
  .object({
    name: z.string(),
  })
  .strict();

const RESPONSE_BODY_SCHEMA_201 = z
  .object({
    data: z
      .object({
        id: z.string().uuid(),
      })
      .strict(),
  })
  .strict();

export const GuineaPigCreateRoute: Route = {
  handler: async (request, response): Promise<z.infer<typeof RESPONSE_BODY_SCHEMA_201>> => {
    const body = await HttpParser
      .requestBody(request, REQUEST_BODY_SCHEMA, 'json');

    // body.name
    // ...

    response.statusCode = 201;

    return await HttpParser.responseBody(request, RESPONSE_BODY_SCHEMA_201, {
      data: {
        id: 'e931c62f-11bf-434f-bb40-facfef7f5b20',
      },
    });
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
          description: 'Guinea pig created',
          content: {
            'application/json': {
              schema: RESPONSE_BODY_SCHEMA_201,
            },
          },
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
