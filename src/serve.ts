import 'dotenv/config';

import * as http from 'http';
// import { HttpContract } from '@caviajs/http-contract';
import { HttpRouter } from '@caviajs/http-router';
import { Logger } from '@caviajs/logger';

import { config } from './config';
import { UpdateUserRoute } from './routes/update-user-route';
import { SentryInterceptor } from './interceptors/sentry-interceptor';
import { BodyParseInterceptor } from './interceptors/body-parse-interceptor';
import { ValidatorInterceptor } from './interceptors/validator-interceptor';

(async () => {
  // setup
  // FooContract.connectionUrl = config.foo.connectionUrl;

  // Http router and server prepare
  const httpRouter = new HttpRouter();

  httpRouter
    .intercept(SentryInterceptor)
    .intercept(BodyParseInterceptor)
    .intercept(ValidatorInterceptor);

  if (config.production === false) {
    // HttpContract.setup('/_meta/contract', httpRouter);
  }

  httpRouter
    .route(UpdateUserRoute);

  const httpServer: http.Server = http.createServer((req, res) => {
    httpRouter.handle(req, res);
  });

  // shutdown hooks
  const listener = async (signal) => {
    try {
      await new Promise<void>(resolve => {
        httpServer.close(() => resolve());
      });

      process.removeListener(signal, listener);
      process.kill(process.pid, signal);
    } catch (e) {
      process.exit(1);
    }
  };

  process.on('SIGINT', listener);

  // listen
  httpServer.listen(config.http.port, () => {
    Logger.trace(`Http server listening at port ${ config.http.port }`);
  });
})();
