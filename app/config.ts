import 'dotenv/config';
import { z } from 'zod';

const ENV_SCHEMA = z.object({
  NODE_ENV: z.enum(['local', 'test', 'stage', 'prod']),
  PORT: z.string().regex(/^\d+$/).default('8080'),
});

const validation = ENV_SCHEMA.safeParse(process.env);

if (!validation.success) {
  throw new Error(JSON.stringify(validation));
}

const env: z.infer<typeof ENV_SCHEMA> = process.env as any;

export const config = {
  env: env.NODE_ENV,

  http: {
    port: Number(env.PORT),
  },
};
