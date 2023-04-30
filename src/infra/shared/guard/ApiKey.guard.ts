import type { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { compare } from 'bcrypt';

import { API_KEY } from '@utils/constants';

export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  private extractKeyFromQuery(request: Request): string {
    const key = request.query.apiKey as string;

    if (!key) throw new ForbiddenException('Invalid API Key');

    return key;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const apiKey = this.extractKeyFromQuery(request);
    const privateKey = this.configService.getOrThrow<string>(API_KEY);

    const isKeyValid = await compare(privateKey, apiKey);

    if (!isKeyValid) {
      throw new ForbiddenException('Invalid API Key');
    }

    return true;
  }
}
