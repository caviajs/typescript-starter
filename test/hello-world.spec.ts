import { makeFetch } from 'supertest-fetch';
import { server } from '../src/server';

describe('GET /hello-world', () => {
  it('should return Hello World', async () => {
    await makeFetch(server)('/hello-world')
      .expectStatus(200)
      .expectBody('Hello World')
      .end();
  });
});
