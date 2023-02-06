import * as http from 'http';
import { HttpRouter } from '@caviajs/http-router';
import { Logger } from '@caviajs/logger';
import { config } from './config';
import { CorsInterceptor } from './interceptors/cors-interceptor';
import { GuineaPigDetailsRoute } from './routes/guinea-pig-details-route';
import { GuineaPigCreateRoute } from './routes/guinea-pig-create-route';

(async () => {
  // setup
  // ...

  // Http router and server prepare
  const httpRouter = new HttpRouter();

  // interceptors
  httpRouter
    .intercept(CorsInterceptor);

  // routes
  httpRouter
    .route(GuineaPigCreateRoute)
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
