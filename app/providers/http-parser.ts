import { HttpException } from '@caviajs/http-exception';
import { z } from 'zod';
import http from 'http';
import { HttpBody } from '@caviajs/http-body';
import { HttpQuery } from '@caviajs/http-query';

export class HttpParser {
  public static async requestBody<T>(request: http.IncomingMessage, schema: z.ZodSchema<T>, outputType: 'json' | 'string'): Promise<T> {
    try {
      return await schema.parseAsync(await HttpBody.parse(request, outputType as any));
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new HttpException(400, {
          code: 'VALIDATION_ERROR',
          errors: error.errors.map(error => ({
            code: error.code,
            message: error.message,
            path: error.path,
          })),
          message: 'The request body is invalid',
        });
      } else {
        throw error;
      }
    }
  }

  public static async requestHeaders<T>(request: http.IncomingMessage, schema: z.ZodSchema<T>): Promise<T> {
    try {
      return await schema.parseAsync(request.headers);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new HttpException(400, {
          code: 'VALIDATION_ERROR',
          errors: error.errors.map(error => ({
            code: error.code,
            message: error.message,
            path: error.path,
          })),
          message: 'The request headers is invalid',
        });
      } else {
        throw error;
      }
    }
  }

  public static async requestParams<T>(request: http.IncomingMessage, schema: z.ZodSchema<T>): Promise<T> {
    try {
      return await schema.parseAsync(request.params);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new HttpException(400, {
          code: 'VALIDATION_ERROR',
          errors: error.errors.map(error => ({
            code: error.code,
            message: error.message,
            path: error.path,
          })),
          message: 'The request params is invalid',
        });
      } else {
        throw error;
      }
    }
  }

  public static async requestQuery<T>(request: http.IncomingMessage, schema: z.ZodSchema<T>): Promise<T> {
    try {
      return await schema.parseAsync(HttpQuery.parse(request));
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new HttpException(400, {
          code: 'VALIDATION_ERROR',
          errors: error.errors.map(error => ({
            code: error.code,
            message: error.message,
            path: error.path,
          })),
          message: 'The request query is invalid',
        });
      } else {
        throw error;
      }
    }
  }

  public static async responseBody<T>(request: http.IncomingMessage, schema: z.ZodSchema<T>, data: T): Promise<T> {
    try {
      return await schema.parseAsync(data);
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new HttpException(500, {
          code: 'VALIDATION_ERROR',
          errors: error.errors.map(error => ({
            code: error.code,
            message: error.message,
            path: error.path,
          })),
          message: 'The response body is invalid',
        });
      } else {
        throw error;
      }
    }
  }
}