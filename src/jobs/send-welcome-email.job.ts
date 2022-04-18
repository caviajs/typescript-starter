import { Injectable, Logger, Type } from '@caviajs/core';

interface Job<T = any> {
  handle(ctx: JobContext<T>): any;
}

interface JobContext<T> {
  data: T;
}

@Injectable()
export class SendWelcomeEmailJob implements Job {
  constructor(
    private readonly logger: Logger,
  ) {
  }

  public handle(ctx: JobContext<{ id: string; dupa: number }>): any {
    ctx.data.dupa;
  }
}
