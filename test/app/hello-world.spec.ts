import { TestBed } from '@caviajs/http';
import { server } from '../../src/app/server';

describe('GET /hello-world', () => {
  it('should return Hello World', async () => {
    const result = await TestBed
      .get(server, 'hello-world', { responseType: 'text' });

    expect(result.body).toBe('Hello World');
    expect(result.statusCode).toBe(200);
  });
});
