import { checked, isDefined, isString } from '@gurban/kit/core/checks';
import { once } from '@gurban/kit/core/once';
import { createContextualLogger } from '@gurban/kit/interfaces/logger-interface';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { promises as fs } from 'fs';
import { join } from 'path';

import { Logger } from '../../logger/logger.module';
import { RedisService } from './redis.service';

const luaDir = join(process.cwd(), '../../libs/util/src/modules/nosql/redis/lua');

@Injectable()
export class RedisScriptManager implements OnModuleInit {
  private scriptSHAs = new Map<string, string>();

  constructor(
    private readonly redis: RedisService,
    private readonly loggerBase: Logger
  ) {}

  readonly scriptsDef = {
    publishSchema: join(luaDir, `publish-schema.lua`),
  } as const;

  @once
  get logger() {
    return createContextualLogger(this.loggerBase, RedisScriptManager.name);
  }

  async onModuleInit() {
    await Promise.all(
      Object.entries(this.scriptsDef)
        .filter(([, file]) => file.endsWith('.lua'))
        .map(async ([name, file]) => this.loadScript(name, file))
    );
  }

  private async loadScript(name: string, path: string) {
    const content = await fs.readFile(path, 'utf8');
    const sha = await this.redis.script('LOAD', content);
    this.scriptSHAs.set(
      name,
      checked(sha, isString, () => `LOAD command returned invalid SHA: ${sha}`)
    );
    this.logger.info(`Loaded Redis script '${name}' with SHA: ${sha} from file '${path}'`);
  }

  getSha(name: keyof typeof this.scriptsDef): string {
    return checked(this.scriptSHAs.get(name), isDefined, () => `Redis script '${name}' not loaded.`);
  }
}
