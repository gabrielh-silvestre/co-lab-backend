import type { Request } from 'express';
import type { User } from '@supabase/supabase-js';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from '@nestjs/common';

import type { IAuthGateway } from '../gateway/auth/Auth.gateway.interface';

import { AUTH_GATEWAY } from '@utils/constants';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(AUTH_GATEWAY) private readonly authGateway: IAuthGateway<User>,
  ) {}

  private extractTokenFromHeader(request: Request): string {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];

    if (type !== 'Bearer') {
      throw new ForbiddenException('Invalid token type');
    }

    if (!token) {
      throw new ForbiddenException('Invalid token');
    }

    return token;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const token = this.extractTokenFromHeader(request);

    const user = await this.authGateway.verifyToken(token);

    request.user = user;

    return true;
  }
}
