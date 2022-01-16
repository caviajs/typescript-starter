import { TestBed } from '@caviajs/schedule';
import { scheduler } from '../../src/schedule/scheduler';

describe('* * * * *', () => {
  it('should execute every...', async () => {
    await TestBed
      .execute(scheduler, '* * * * *');

    // do sth
  });
});
