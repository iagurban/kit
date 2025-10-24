import { checked, isString, isTruthy } from '@gurban/kit/core/checks';
import { once } from '@gurban/kit/core/once';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

import { createContextualLogger, Logger } from '../../logger/logger.module';
import { RedisService } from './redis.service';

@Injectable()
export class RedisScriptManager implements OnModuleInit {
  private scriptShas = new Map<string, string>();

  constructor(
    private readonly redis: RedisService,
    private readonly loggerBase: Logger
  ) {}

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, RedisScriptManager.name);
  }

  async onModuleInit() {
    // Load all scripts on application startup
    await this.loadScript('publishSchema', join(__dirname, 'lua/publish-schema.lua'));
  }

  private async loadScript(name: string, path: string) {
    const script = await fs.readFile(path, 'utf8');
    const sha = await this.redis.script('LOAD', script);
    this.scriptShas.set(
      name,
      checked(sha, isString, () => `LOAD command returned invalid SHA: ${sha}`)
    );
    this.logger.info(`Loaded Redis script '${name}' with SHA: ${sha}`);
  }

  getSha(name: string): string {
    return checked(this.scriptShas.get(name), isTruthy, () => `Redis script '${name}' not loaded.`);
  }
}
