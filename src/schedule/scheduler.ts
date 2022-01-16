import { Scheduler } from '@caviajs/schedule';
import { Logger } from '@caviajs/logger';

const scheduler = new Scheduler();

scheduler.define('* * * * *', () => {
  Logger.trace('Hello Schedule');
});

export { scheduler };
