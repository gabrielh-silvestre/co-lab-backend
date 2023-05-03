import type { Request } from 'express';
import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

import { API_KEY } from '@utils/constants';

export class ApiKeyGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}

  private extractFromCustomHeader(request: Request): string {
    const key = request.headers['x-api-key'] as string;

    if (!key) throw new ForbiddenException('Missing API Key');

    return key;
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();

    const apiKey = this.extractFromCustomHeader(request);
    const privateKey = this.configService.getOrThrow<string>(API_KEY);

    const isKeyValid = privateKey === apiKey;
    if (!isKeyValid) throw new ForbiddenException('Invalid API Key');

    return true;
  }
}
