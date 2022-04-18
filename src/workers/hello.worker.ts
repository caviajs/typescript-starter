import { Injectable, Logger, Scheduled } from '@caviajs/core';

@Injectable()
export class HelloWorker {
  constructor(
    private readonly logger: Logger,
  ) {
  }

  @Scheduled('*/5 * * * *')
  public helloPiggy2(): void {
    this.logger.error('Hello Piggy2!');
  }

  @Scheduled('* * * * *')
  public helloPiggy(): void {
    this.logger.info('Hello Piggy!');
  }
}
