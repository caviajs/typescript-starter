import { server } from './server';
import { Logger } from '@caviajs/logger';

server
  .listen(3000, () => Logger.info('App running at port 3000'));
