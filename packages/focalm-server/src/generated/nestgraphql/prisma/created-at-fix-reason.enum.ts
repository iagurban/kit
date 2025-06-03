import { registerEnumType } from '@nestjs/graphql';

export enum CreatedAtFixReason {
  Low = 'Low',
  High = 'High',
  Both = 'Both',
}

registerEnumType(CreatedAtFixReason, { name: 'CreatedAtFixReason', description: undefined });
