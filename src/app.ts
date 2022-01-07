import { Application, HttpException, parseBody, parseQuery } from '@kaviajs/http-server';

const app = new Application({
  catcher: (err, req, res) => {
    console.log(err);

    return err;
  },
});

app.route('GET', '/hello-world', (req, res) => {
  return 'Hello World';
});

app.route('POST', '/request', async (req, res) => {
  const body = await parseBody(req, 'text/plain');

  console.log(body);

  // throw new HttpException(401);

  return true;
});

app.route('GET', '/test1', (req, res) => {
  return parseQuery(req);
});

app.route('GET', '/test2/:id', (req, res) => {
  if (req.params.id === '1') {
    throw new HttpException(409);
  }

  return req.params;
});

export { app };
