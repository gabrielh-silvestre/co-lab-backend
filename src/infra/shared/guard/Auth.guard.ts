import type { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
} from '@nestjs/common';

import { SupabaseClient } from '@supabase/supabase-js';

import { SUPABASE_CLIENT } from '@utils/constants';

export class AuthGuard implements CanActivate {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
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

    const {
      data: { user },
      error,
    } = await this.supabase.auth.getUser(token);

    request.user = user;

    if (error) throw new ForbiddenException(error.message, { cause: error });
    return true;
  }
}
