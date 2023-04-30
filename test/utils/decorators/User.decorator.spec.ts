import { ExecutionContext } from '@nestjs/common';
import { ROUTE_ARGS_METADATA } from '@nestjs/common/constants';
import { randomUUID } from 'node:crypto';

import { User } from '@utils/decorators/user/User.decorator';

// eslint-disable-next-line @typescript-eslint/ban-types
function getParamDecoratorFactory(decorator: Function) {
  class Test {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars, @typescript-eslint/no-empty-function
    public test(@decorator('test') _value: unknown) {}
  }

  const args = Reflect.getMetadata(ROUTE_ARGS_METADATA, Test, 'test');
  return args[Object.keys(args)[0]].factory;
}

const UUID = randomUUID();

const MOCK_CTX: ExecutionContext = {
  switchToHttp: jest.fn().mockImplementation(() => ({
    getRequest: jest.fn().mockImplementation(() => ({
      user: { id: UUID, name: 'John Doe' },
    })),
  })),
} as unknown as ExecutionContext;

describe('[Infra][Unit] Tests for @User decorator', () => {
  it('should create a @User decorator', () => {
    expect(getParamDecoratorFactory(User)).toBeDefined();
  });

  it('should return the complete user object', () => {
    const factory = getParamDecoratorFactory(User);

    const user = factory(null, MOCK_CTX);

    expect(user).toStrictEqual({
      id: expect.any(String),
      name: expect.any(String),
    });
  });

  it('should return the user id', () => {
    const factory = getParamDecoratorFactory(User);

    const id = factory('id', MOCK_CTX);

    expect(id).toEqual(UUID);
  });

  it('should return undefined when user property does not exist', () => {
    const factory = getParamDecoratorFactory(User);

    const id = factory('email', MOCK_CTX);

    expect(id).toBeUndefined();
  });

  it('should return undefined when user does not exist', () => {
    jest.mocked(MOCK_CTX.switchToHttp).mockImplementationOnce(
      () =>
        ({
          getRequest: jest.fn().mockImplementationOnce(() => ({
            user: undefined,
          })),
        } as any),
    );
    const factory = getParamDecoratorFactory(User);

    const id = factory('email', MOCK_CTX);

    expect(id).toBeUndefined();
  });
});
