import * as http from 'http';
import { httpRouter } from './http-router';

export const server = http.createServer((req, res) => {
  try {
    httpRouter.handle(req, res);
  } catch (error) {
    console.error(error);
  }
});
