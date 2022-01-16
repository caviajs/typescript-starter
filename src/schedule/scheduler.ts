import { Scheduler } from '@caviajs/schedule';

const scheduler = new Scheduler();

scheduler.define('* * * * *', () => {
  console.log('Hello World');
});

export { scheduler };
