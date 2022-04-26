import 'reflect-metadata';

import { CaviaApplication, CaviaFactory } from '@caviajs/core';

import { CreateUserEndpoint } from './endpoints/create-user.endpoint';
import { ApiSpecEndpoint } from './endpoints/api-spec.endpoint';
import { UpdateUserEndpoint } from './endpoints/update-user.endpoint';
import { SentryInterceptor } from './interceptors/sentry.interceptor';
import { LoggerInterceptor } from './interceptors/logger.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BodyParseInterceptor } from './interceptors/body-parse.interceptor';
import { CookiesParseInterceptor } from './interceptors/cookies-parse.interceptor';
import { QueryParseInterceptor } from './interceptors/query-parse.interceptor';
import { ValidatorInterceptor } from './interceptors/validator.interceptor';
import { ClearStorageWorker } from './workers/clear-storage.worker';
import { PaynowProvider } from './providers/paynow.provider';

(async () => {
  const app: CaviaApplication = await CaviaFactory
    .create({
      providers: [
        CreateUserEndpoint,
        ApiSpecEndpoint,
        UpdateUserEndpoint,

        PaynowProvider,

        SentryInterceptor,
        LoggerInterceptor,
        AuthInterceptor,
        BodyParseInterceptor,
        CookiesParseInterceptor,
        QueryParseInterceptor,
        ValidatorInterceptor,

        ClearStorageWorker,
      ],
      schemas: {
        env: {
          DATABASE_URL: {
            type: 'string',
            required: true,
          },
        },
      },
    });

  const listener = async (signal) => {
    try {
      await app.shutdown(signal);

      process.removeListener(signal, listener);
      process.kill(process.pid, signal);
    } catch (e) {
      process.exit(1);
    }
  };

  process.on('SIGINT', listener);

  await app.listen();
})();
