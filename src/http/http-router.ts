import { HttpRouter } from '@caviajs/http';
import { Logger } from '@caviajs/logger';

const httpRouter = new HttpRouter();

httpRouter.route('GET', 'hello-world', () => {
  Logger.trace('Hello HTTP');

  return 'Hello World';
});

export { httpRouter };
