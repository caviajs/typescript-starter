import { Controller, RouteMapping, Schema, Validator, Request, Response, RedisConnection, InjectRedisConnection } from '@caviajs/core';

const createUserRequestBodySchema: Schema = {
  members: {
    name: {
      type: 'string',
    },
    surname: {
      type: 'string',
      required: true,
    },
  },
  type: 'object',
};

const createUserRequestQuerySchema: Schema = {
  members: {
    username: {
      type: 'string',
    },
    password: {
      type: 'string',
    },
  },
  type: 'object',
};

const createUserResponse200Schema: Schema = {
  type: 'string',
};

const createUserResponse400Schema: Schema = {
  members: {
    statusCode: {
      type: 'number',
    },
    statusMessage: {
      type: 'string',
    },
  },
  type: 'object',
};

@Controller()
export class UserController {
  constructor(
    protected readonly validator: Validator,
    @InjectRedisConnection('first-connection') protected readonly redis: RedisConnection,
  ) {
  }

  @RouteMapping('POST', 'users/:id', {
    request: {
      body: createUserRequestBodySchema,
      query: createUserRequestQuerySchema,
    },
    responses: {
      200: createUserResponse200Schema,
      400: createUserResponse400Schema,
    },
  })
  public async createUser(request: Request, response: Response): Promise<any> {
    this.redis.set("mykey", "hello", "EX", 10);

    const schema: Schema = {
      members: {
        type: 'number',
      },
      type: 'array',
    };

    // const errors = await this.validator.validate({
    //   data: [1, 2, '3'],
    //   schema: schema,
    // });

    // if (errors.length) {
    //   throw new HttpException(400);
    // }

    return 'OK';
  }
}
