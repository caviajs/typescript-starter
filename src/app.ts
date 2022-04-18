import 'reflect-metadata';

import { Application, Provider, Package, UseInterceptor, RedisPackage } from '@caviajs/core';

import { MetaController } from './controllers/meta.controller';
import { UserController } from './controllers/user.controller';
import { BodyParseInterceptor } from './interceptors/body-parse.interceptor';
import { SentryInterceptor } from './interceptors/sentry.interceptor';
import { ValidatorInterceptor } from './interceptors/validator.interceptor';
import { CookiesParseInterceptor } from './interceptors/cookies-parse.interceptor';
import { QueryParseInterceptor } from './interceptors/query-parse.interceptor';
import { HelloWorker } from './workers/hello.worker';

const packages: Package[] = [
  RedisPackage.declareConnection('first-connection'),
];

const providers: Provider[] = [
  MetaController,
  UserController,

  BodyParseInterceptor,
  CookiesParseInterceptor,
  QueryParseInterceptor,
  SentryInterceptor,
  ValidatorInterceptor,

  HelloWorker,
];

@UseInterceptor(SentryInterceptor)
@UseInterceptor(BodyParseInterceptor)
@UseInterceptor(CookiesParseInterceptor)
@UseInterceptor(QueryParseInterceptor)
@UseInterceptor(ValidatorInterceptor)
@Application({
  packages: packages,
  providers: providers,
})
export class App {
}
