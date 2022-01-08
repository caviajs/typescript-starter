import { HttpRouter, HttpException, HttpClient } from '@caviajs/http';

const router = new HttpRouter({
  catcher: (err, req, res) => {
    console.log(err);

    return err;
  },
});

router.route('GET', 'hello-world', async (req, res) => {
  // const result = await HttpClient
  //   .request({ url: 'https://api.paynow.com/payments', method: 'POST' });

  return 'Hello World';
});

router.route('POST', 'request', async (req, res) => {
  const body = await req.body('text/plain');

  console.log(body);

  // throw new HttpException(401);

  return true;
});

router.route('GET', 'test1', (req, res) => {
  return req.qs();
});

router.route('GET', 'test2/:id', (req, res) => {
  if (req.params.id === '1') {
    throw new HttpException(409);
  }

  return req.params;
});

export { router };
