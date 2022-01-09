import * as http from 'http';
import { router } from './router';

export const server = http.createServer((req, res) => {
  try {
    router.handle(req, res);
  } catch (error) {
    console.error(error);
  }
});
