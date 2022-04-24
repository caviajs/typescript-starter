import { Injectable, Logger, Worker, WorkerMetadata } from '@caviajs/core';

@Injectable()
export class ClearStorageWorker extends Worker {

  public readonly metadata: WorkerMetadata = {
    expression: '* * * * *',
  };

  constructor(protected readonly logger: Logger) {
    super();
  }

  public async handle(): Promise<void> {
    this.logger.info('The piggy has just paid 5 euros', 'Payment');

    // ...
  }

}
