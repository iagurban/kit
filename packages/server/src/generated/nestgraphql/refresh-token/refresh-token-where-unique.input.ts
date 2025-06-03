import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';
import { UserScalarRelationFilter } from '../user/user-scalar-relation-filter.input';
import { RefreshTokenWhereInput } from './refresh-token-where.input';

@InputType()
export class RefreshTokenWhereUniqueInput {
  @Field(() => String, { nullable: true })
  id?: string;

  @Field(() => [RefreshTokenWhereInput], { nullable: true })
  AND?: Array<RefreshTokenWhereInput>;

  @Field(() => [RefreshTokenWhereInput], { nullable: true })
  OR?: Array<RefreshTokenWhereInput>;

  @Field(() => [RefreshTokenWhereInput], { nullable: true })
  NOT?: Array<RefreshTokenWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  userId?: UuidFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  expiresAt?: DateTimeFilter;

  @Field(() => StringFilter, { nullable: true })
  hash?: StringFilter;

  @Field(() => UserScalarRelationFilter, { nullable: true })
  user?: UserScalarRelationFilter;
}
