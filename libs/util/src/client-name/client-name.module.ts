import { Global, Module } from '@nestjs/common';

import { ClientName } from './client-name';

@Global()
@Module({ providers: [ClientName], exports: [ClientName] })
export class ClientNameModule {}
