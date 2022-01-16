import { scheduler } from './scheduler';
import { Logger } from '@caviajs/logger';

scheduler
  .start(() => Logger.info('Scheduler running'));
