import { GqlJwtAuthGuardBase } from '@gurban/kit/nest/guards/gql-jwt-auth-guard-base';
import { Injectable } from '@nestjs/common';

@Injectable()
export class GqlJwtAuthGuard extends GqlJwtAuthGuardBase {}
