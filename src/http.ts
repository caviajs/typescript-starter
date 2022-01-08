import { server } from './app/server';

server
  .listen(3000, () => console.log('App running at port 3000'));
