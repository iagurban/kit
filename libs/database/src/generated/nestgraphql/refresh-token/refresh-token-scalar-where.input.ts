import { Field, InputType } from '@nestjs/graphql';

import { DateTimeFilter } from '../prisma/date-time-filter.input';
import { StringFilter } from '../prisma/string-filter.input';
import { UuidFilter } from '../prisma/uuid-filter.input';

@InputType()
export class RefreshTokenScalarWhereInput {
  @Field(() => [RefreshTokenScalarWhereInput], { nullable: true })
  AND?: Array<RefreshTokenScalarWhereInput>;

  @Field(() => [RefreshTokenScalarWhereInput], { nullable: true })
  OR?: Array<RefreshTokenScalarWhereInput>;

  @Field(() => [RefreshTokenScalarWhereInput], { nullable: true })
  NOT?: Array<RefreshTokenScalarWhereInput>;

  @Field(() => UuidFilter, { nullable: true })
  id?: UuidFilter;

  @Field(() => UuidFilter, { nullable: true })
  userId?: UuidFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  createdAt?: DateTimeFilter;

  @Field(() => DateTimeFilter, { nullable: true })
  expiresAt?: DateTimeFilter;

  @Field(() => StringFilter, { nullable: true })
  hash?: StringFilter;
}
