import { Injectable, QueueConsumer } from '@caviajs/core';

interface QueueMessage {
  data: Buffer;
  contentType: string;
}

@Injectable()
export class HelloConsumer {
  @QueueConsumer('send-email')
  public sendEmailConsumer(message: QueueMessage) {
  }
}
