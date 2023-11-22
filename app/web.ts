import './polyfills';

import * as http from 'http';
import { readFileSync } from 'fs';
import { join } from 'path';
import { HttpRouter } from '@caviajs/http-router';
import { config } from './config';
import { CorsInterceptor } from './interceptors/cors-interceptor';
import { GuineaPigDetailsRoute } from './routes/guinea-pig-details-route';
import { GuineaPigCreateRoute } from './routes/guinea-pig-create-route';
import { OpenAPIRegistry, OpenApiGeneratorV3 } from '@asteasolutions/zod-to-openapi';
import { z } from 'zod';
import { COMMON_HEADERS_SCHEMA } from './schema';
import { BootstrapInterceptor } from './interceptors/bootstrap.interceptor';

const { version } = require('../package.json');

(async () => {
  // setup (database connection)
  // ...

  // router
  const httpRouter = new HttpRouter();

  httpRouter
    // interceptors
    .intercept(BootstrapInterceptor) /* ! IMPORTANT: BootstrapInterceptor MUST BE FIRST ! */
    .intercept(CorsInterceptor)
    // other interceptors ex. AuthInterceptor...

    // routes
    .route(GuineaPigCreateRoute)
    .route(GuineaPigDetailsRoute);

  // swagger
  if (config.env !== 'prod') {
    httpRouter
      .route({
        handler: (request, response) => {
          if (request.headers.accept?.includes('text/html')) {
            response.setHeader('Content-Type', 'text/html');

            return readFileSync(join(process.cwd(), 'public', 'swagger.html'), 'utf8');
          }

          const registry = new OpenAPIRegistry();

          for (const route of httpRouter.specification.routes) {
            if (route.path === '/swagger') {
              continue;
            }

            registry.registerPath({
              method: route.method.toLowerCase() as any,
              path: route.path,
              description: request.metadata?.swagger?.description,
              summary: request.metadata?.swagger?.summary,
              request: {
                body: route.metadata?.swagger?.request?.body,
                headers: z
                  .object({})
                  .merge(COMMON_HEADERS_SCHEMA)
                  .merge(route.metadata?.swagger?.request?.headers || z.object({})),
                params: route.metadata?.swagger?.request?.params,
                query: route.metadata?.swagger?.request?.query,
              },
              responses: route.metadata?.swagger?.responses || {},
              tags: route.metadata?.swagger?.tags || [],
              security: [
                // {
                //   BearerAuth: route.interceptors?.some(it => it['swagger.security.BearerAuth'] === true) ? [] as string[] : undefined,
                // },
              ],
            });
          }

          const generator = new OpenApiGeneratorV3(registry.definitions);

          return generator.generateDocument({
            openapi: '3.0.0',
            info: {
              version: version,
              title: 'Core API',
            },
            servers: [
              { url: 'https://api.example-test.com' },
              { url: 'https://api.example.com' },
            ],
          });
        },
        method: 'GET',
        path: '/swagger',
      });
  }

  // server
  const httpServer: http.Server = http.createServer((req, res) => {
    httpRouter.handle(req, res);
  });

  // listen
  httpServer.listen(config.http.port, () => {
    console.log(`[Bootstrap] Http server listening at port ${config.http.port}`);
  });
})();
