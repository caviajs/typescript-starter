import { Controller, RouteMapping, Request, Response } from '@caviajs/core';
import { Queue } from '../services/queue';

@Controller('queue')
export class QueueController {
  constructor(
    protected readonly queue: Queue,
  ) {
  }

  @RouteMapping('POST', 'dispatch')
  public spec(request: Request, response: Response): any {

  }
}
