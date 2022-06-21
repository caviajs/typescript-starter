import 'dotenv/config';
import { Env } from '@caviajs/env';

Env.validate({
  NODE_ENV: {
    expressions: [/^(dev|prod|test)$/],
    required: true,
  },
});

export const config = {
  http: {
    port: 3000,
  },

  production: process.env.NODE_ENV === 'prod',
};
