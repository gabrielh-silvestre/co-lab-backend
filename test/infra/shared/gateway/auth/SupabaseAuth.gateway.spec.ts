import { ForbiddenException } from '@nestjs/common';

import { SupabaseAuthGateway } from '@shared/infra/gateway/auth/supabase/SupabaseAuth.gateway';

const SUCCESS_AUTH_RESPONSE = {
  data: { user: {} },
  error: null,
};

const ERROR_AUTH_RESPONSE = {
  data: { user: null },
  error: new Error('error'),
};

describe('[Infra][Unit] Tests for SupabaseAuthGateway', () => {
  let gateway: SupabaseAuthGateway;

  let supabaseClientMock: any;

  let getUserSpy: jest.SpyInstance;

  beforeEach(() => {
    supabaseClientMock = {
      auth: {
        getUser: jest.fn(),
      },
    };

    getUserSpy = jest.spyOn(supabaseClientMock.auth, 'getUser');
    gateway = new SupabaseAuthGateway(supabaseClientMock);
  });

  afterEach(() => {
    getUserSpy.mockClear();
  });

  it('should create a SupabaseAuthGateway', () => {
    expect(gateway).toBeDefined();
    expect(gateway).toBeInstanceOf(SupabaseAuthGateway);
  });

  it('should verify a valid token', async () => {
    supabaseClientMock.auth.getUser.mockResolvedValueOnce(
      SUCCESS_AUTH_RESPONSE,
    );

    const act = () => gateway.verifyToken('token');

    expect(act).not.toThrow();
    expect(getUserSpy).toHaveBeenCalledTimes(1);
  });

  it('should throw an ForbiddenException when token is invalid', async () => {
    supabaseClientMock.auth.getUser.mockResolvedValueOnce(ERROR_AUTH_RESPONSE);

    const act = () => gateway.verifyToken('token');

    try {
      await act();
      expect(true).toBe(false);
    } catch (error) {
      expect(error).toBeDefined();
      expect(error).toBeInstanceOf(ForbiddenException);
      expect(getUserSpy).toHaveBeenCalledTimes(1);
    }
  });
});
