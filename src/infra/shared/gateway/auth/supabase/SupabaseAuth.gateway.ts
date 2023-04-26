import { ForbiddenException, Inject, Injectable } from '@nestjs/common';
import { SupabaseClient, User } from '@supabase/supabase-js';

import type { IAuthGateway } from '../Auth.gateway.interface';

import { SUPABASE_CLIENT } from '@utils/constants';

@Injectable()
export class SupabaseAuthGateway implements IAuthGateway<User> {
  constructor(
    @Inject(SUPABASE_CLIENT)
    private readonly supabaseClient: SupabaseClient,
  ) {}

  async verifyToken(token: string): Promise<User> {
    const {
      data: { user },
      error,
    } = await this.supabaseClient.auth.getUser(token);

    if (error) throw new ForbiddenException(error.message, { cause: error });

    return user;
  }
}
