import 'dotenv/config';
import { z } from 'zod';

const ENV_SCHEMA = z.object({
  NODE_ENV: z.enum(['local', 'test', 'stage', 'prod']),
});

const validation = ENV_SCHEMA.safeParse(process.env);

if (!validation.success) {
  throw new Error(JSON.stringify(validation));
}

const env: z.infer<typeof ENV_SCHEMA> = process.env as any;

export const config = {
  http: {
    port: 3000,
  },

  production: env.NODE_ENV === 'prod',
};
