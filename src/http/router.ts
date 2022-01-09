import { HttpRouter } from '@caviajs/http';

const router = new HttpRouter();

router.route('GET', 'hello-world', () => {
  return 'Hello World';
});

export { router };
