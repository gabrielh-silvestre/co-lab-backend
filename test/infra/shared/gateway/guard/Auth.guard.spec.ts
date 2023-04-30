import { ExecutionContext } from '@nestjs/common';
import { fail } from 'node:assert';

import type { IAuthGateway } from '@shared/infra/gateway/auth/Auth.gateway.interface';

import { AuthGuard } from '@shared/infra/guard/Auth.guard';

const MOCK_CTX: ExecutionContext = {
  switchToHttp: jest.fn().mockImplementation(() => ({
    getRequest: jest.fn().mockImplementation(() => ({
      headers: { authorization: 'Bearer token' },
    })),
  })),
} as unknown as ExecutionContext;

describe('[Infra][Integration] Tests for AuthGuard', () => {
  let gateway: IAuthGateway<any>;

  let authGuard: AuthGuard;

  let verifyTokenSpy: jest.SpyInstance;

  beforeEach(() => {
    gateway = {
      verifyToken: jest.fn(),
    };

    authGuard = new AuthGuard(gateway);

    verifyTokenSpy = jest.spyOn(gateway, 'verifyToken');
  });

  afterEach(() => {
    verifyTokenSpy.mockClear();
  });

  it('should create an AuthGuard', () => {
    expect(authGuard).toBeDefined();
    expect(authGuard).toBeInstanceOf(AuthGuard);
  });

  it('should return true when token is valid', async () => {
    jest.mocked(gateway.verifyToken).mockResolvedValueOnce({});

    const act = () => authGuard.canActivate(MOCK_CTX);

    expect(await act()).toBe(true);
    expect(verifyTokenSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw an exception when token is invalid', async () => {
    jest.mocked(gateway.verifyToken).mockRejectedValueOnce(new Error('error'));

    const act = () => authGuard.canActivate(MOCK_CTX);

    try {
      await act();
      fail('should throw an exception');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should throw an exception when authorization does not exist', async () => {
    jest.mocked(MOCK_CTX).switchToHttp.mockImplementation(
      () =>
        ({
          getRequest: () => ({
            headers: {},
          }),
        } as any),
    );

    const act = () => authGuard.canActivate(MOCK_CTX);

    try {
      await act();
      fail('should throw an exception');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should throw an exception when token type is invalid', async () => {
    jest.mocked(MOCK_CTX).switchToHttp.mockImplementation(
      () =>
        ({
          getRequest: () => ({
            headers: { authorization: 'Basic token' },
          }),
        } as any),
    );

    const act = () => authGuard.canActivate(MOCK_CTX);

    try {
      await act();
      fail('should throw an exception');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });

  it('should throw an exception when token is not provided', async () => {
    jest.mocked(MOCK_CTX).switchToHttp.mockImplementation(
      () =>
        ({
          getRequest: () => ({
            headers: { authorization: 'Bearer ' },
          }),
        } as any),
    );

    const act = () => authGuard.canActivate(MOCK_CTX);

    try {
      await act();
      fail('should throw an exception');
    } catch (error) {
      expect(error).toBeDefined();
    }
  });
});
