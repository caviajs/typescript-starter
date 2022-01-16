import { HttpRouter } from '@caviajs/http';

const httpRouter = new HttpRouter();

httpRouter.route('GET', 'hello-world', () => {
  return 'Hello World';
});

export { httpRouter };
