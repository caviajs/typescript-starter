import { z } from 'zod';

export const COMMON_HEADERS_SCHEMA = z
  .object({
    'x-forwarded-for': z.string().optional(),
    'x-request-id': z.string().optional(),
    'x-request-start': z.string().optional(),
  });
