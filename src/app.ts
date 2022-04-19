import 'reflect-metadata';

import { Application, ENV_SCHEMA, EnvSchema, UseInterceptor } from '@caviajs/core';
import { UsersController } from './controllers/users.controller';
import { SentryInterceptor } from './interceptors/sentry.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { BodyParseInterceptor } from './interceptors/body-parse.interceptor';
import { CookiesParseInterceptor } from './interceptors/cookies-parse.interceptor';
import { QueryParseInterceptor } from './interceptors/query-parse.interceptor';
import { ValidatorInterceptor } from './interceptors/validator.interceptor';

@UseInterceptor(SentryInterceptor)
@UseInterceptor(BodyParseInterceptor)
@UseInterceptor(CookiesParseInterceptor)
@UseInterceptor(QueryParseInterceptor)
@UseInterceptor(ValidatorInterceptor)
@Application({
  packages: [],
  providers: [
    {
      provide: ENV_SCHEMA,
      useValue: <EnvSchema>{
        DATABASE_URL: {
          type: 'string',
          required: true,
        },
      },
    },

    UsersController,

    AuthInterceptor,
    BodyParseInterceptor,
    CookiesParseInterceptor,
    QueryParseInterceptor,
    SentryInterceptor,
    ValidatorInterceptor,
  ],
})
export class App {
}
