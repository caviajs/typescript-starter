import http from 'http';
import { app } from './app';

export const server = http.createServer((req, res) => {
  try {
    app.handle(req, res);
  } catch (err) {
    console.log('globalny error: ', err);
  }
});
