import { RouteMapping, Schema, Request, Response, UseInterceptor, Injectable, Method, Path, OnApplicationBoot, Controller } from '@caviajs/core';
import { AuthInterceptor } from '../interceptors/auth.interceptor';

const updateUserRequestBody: Schema = {
  members: {
    username: {
      type: 'string',
      required: true,
    },
    password: {
      type: 'string',
      required: true,
    },
  },
  type: 'object',
};

@Controller()
export class UsersController {

  @UseInterceptor(AuthInterceptor, ['users:update'])
  @RouteMapping('PUT', 'users/:id', {
    request: {
      body: updateUserRequestBody,
    },
  })
  public async updateUser(request: Request, response: Response): Promise<string> {
    console.log('updateUser handler');

    return 'Hello World';
  }

}
