import { HttpException } from '@caviajs/core';

export class UserNotFoundException extends HttpException {
  constructor() {
    super(404, 'User not found');
  }
}
