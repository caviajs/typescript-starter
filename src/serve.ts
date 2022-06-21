import * as http from 'http';
import { HttpRouter } from '@caviajs/http-router';
import { Logger } from '@caviajs/logger';
import { config } from './config';
import { HttpContractInterceptor } from './interceptors/http-contract-interceptor';
import { HttpCookieInterceptor } from './interceptors/http-cookie-interceptor';
import { HttpCorsInterceptor } from './interceptors/http-cors-interceptor';
import { GuineaPigDetailsRoute } from './routes/guinea-pig-details-route';

(async () => {
  // setup
  // FooContract.connectionUrl = config.foo.connectionUrl;

  // Http router and server prepare
  const httpRouter = new HttpRouter();

  httpRouter
    .intercept(HttpCorsInterceptor)
    .intercept(HttpCookieInterceptor)
    .intercept(HttpContractInterceptor);

  if (config.production === false) {
    httpRouter
      .route({
        handler: () => httpRouter.specification,
        method: 'GET',
        path: '/meta/contract',
      });
  }

  httpRouter
    .route(GuineaPigDetailsRoute);

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
