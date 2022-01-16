import { scheduler } from './scheduler';

scheduler
  .start(() => console.log('Scheduler running'));
