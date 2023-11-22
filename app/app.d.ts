import { AnyZodObject } from 'zod';
import { ResponseConfig, ZodRequestBody } from '@asteasolutions/zod-to-openapi';

declare module '@caviajs/http-router' {
  export interface RouteMetadata {
    swagger?: {
      description?: string;
      summary?: string;
      request?: {
        body?: ZodRequestBody;
        headers?: AnyZodObject;
        params?: AnyZodObject;
        query?: AnyZodObject;
      };
      responses?: {
        [statusCode: string]: ResponseConfig;
      };
      tags?: string[];
    };
  }
}
