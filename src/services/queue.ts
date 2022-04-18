import { Injectable, Type } from '@caviajs/core';

@Injectable()
export class Queue {
  public dispatch<T>(task: Type<Task<T>>, data: T) {

  }
}

export interface Task<T> {
  handle(ctx: TaskContext<T>): void | Promise<void>;
}

export interface TaskContext<T> {
  data: T;
}
