import {Application, parseBody, parseQuery, HttpException} from '@kaviajs/http-server';

import http from 'http';

const app = new Application({
  catcher: (err, req, res) => {
    console.log(err);

    return err;
  },
});

app.route('POST', '/request', async (req, res) => {
  const body = await parseBody(req, 'text/plain');

  console.log(body);
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

http
  .createServer((req, res) => {
    try {
      app.handle(req, res);
    } catch (err) {
      console.log('globalny error: ', err);
    }
  })
  .listen(3000, () => console.log('App running at port 3000'));
